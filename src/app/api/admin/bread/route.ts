import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences } from '@db/schemas/image';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { and, asc, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { OrderByType, WithImageId } from 'src/shared/api/typings';

import { BREAD_CACHE_TAG, BREAD_CONTEXT } from '@entities/bread/consts';
import { BreadFormDto } from '@entities/bread/types';
import { IMAGE_CONTEXT, IMAGE_REF_VALUES } from '@entities/image/consts';

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

  const searchClause = search ? ilike(breads.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(breads.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(breads.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  let findBreads, total;

  try {
    [findBreads, [total]] = await Promise.all([
      db
        .select()
        .from(breads)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() }).from(breads).where(whereClause),
    ]);
  } catch (error) {
    return responseWithCapture({
      error,
      context: BREAD_CONTEXT.GET,
      message: BREAD_ERRORS.GET_FAILED,
      payload: {
        searchParams,
      },
    });
  }

  return NextResponse.json(
    setSucResponseList({
      list: findBreads,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageId<BreadFormDto>;

  const { name, description, price, mbti, sortOrder, imageId, isHidden, isNew, isSignature } = body;

  let newBread;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  try {
    [newBread] = await db
      .insert(breads)
      .values({
        name,
        description,
        price: Number(price),
        mbti,
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .returning();
  } catch (error) {
    return responseWithCapture({
      error,
      context: BREAD_CONTEXT.CREATE,
      message: BREAD_ERRORS.CREATE_FAILED,
      payload: {
        body,
      },
    });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newBread.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, IMAGE_REF_VALUES.BREAD),
          isNull(imageReferences.refId),
        ),
      );

    revalidateTag(BREAD_CACHE_TAG.GET_LIST);

    return NextResponse.json(setSucResponseItem(newBread), { status: 201 });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_UPLOAD,
      context: IMAGE_CONTEXT.UPDATE,
      payload: {
        body,
      },
    });
  }
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(breads.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(breads.createdAt);
    case ORDER_BY_TYPES.PRICE_DESC:
      return desc(breads.price);
    case ORDER_BY_TYPES.PRICE_ASC:
      return asc(breads.price);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(breads.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(breads.sortOrder);
    default:
      return asc(breads.sortOrder);
  }
};
