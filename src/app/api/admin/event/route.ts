import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences } from '@db/schemas/image';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import dayjs from 'dayjs';
import { and, asc, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { EVENT_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { OrderByType, WithImageId } from 'src/shared/api/typings';

import { EventFormDto } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import { FILTER_TYPES, PER_PAGE_SIZE } from '@consts/commons';

export const GET = withAuth(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || 1;
  const pageSize = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE_SIZE)) || PER_PAGE_SIZE.DEFAULT;
  const showType = searchParams.get(SEARCH_PARAMS_KEYS.SHOW_TYPE) || FILTER_TYPES.ALL;
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || undefined;
  const orderClause = getOrderClause(orderBy as OrderByType);
  const search = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH) || '';

  const offset = (page - 1) * pageSize;

  const searchClause = search ? ilike(events.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(events.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(events.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  const [findEvents, [total]] = await Promise.all([
    db.select().from(events).where(whereClause).orderBy(orderClause).limit(pageSize).offset(offset),
    db.select({ count: count() }).from(events).where(whereClause),
  ]);

  return NextResponse.json(
    setSucResponseList({
      list: findEvents,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as Partial<WithImageId<EventFormDto>>;

  const { name, description, startDate, endDate, sortOrder, imageId, isHidden } = body;

  let newEvent;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  const _startDate = dayjs(startDate);
  const _endDate = dayjs(endDate);

  if (!_startDate.isValid() || !_endDate.isValid()) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_DATE }, { status: 400 });
  }

  if (_startDate.isAfter(_endDate)) {
    return NextResponse.json({ error: EVENT_ERRORS.OVER_DATE }, { status: 400 });
  }

  try {
    [newEvent] = await db
      .insert(events)
      .values({
        name,
        description,
        sortOrder: Number(sortOrder),
        isHidden,
        startDate: _startDate.toDate(),
        endDate: _endDate.toDate(),
      })
      .returning();
  } catch (e) {
    console.error('Error inserting event:', e);
    return NextResponse.json({ error: EVENT_ERRORS.CREATE_FAILED }, { status: 500 });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newEvent.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, IMAGE_REF_VALUES.EVENT),
          isNull(imageReferences.refId),
        ),
      );
  } catch (e) {
    console.error('Error inserting image:', e);

    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPLOAD }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(newEvent));
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(events.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(events.createdAt);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(events.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(events.sortOrder);
    default:
      return asc(events.sortOrder);
  }
};
