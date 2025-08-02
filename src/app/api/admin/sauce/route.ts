import db from '@db/index';
import { imageReferences } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { and, asc, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { SAUCE_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { OrderByType, WithImageId } from 'src/shared/api/typings';

import { IMAGE_CONTEXT, IMAGE_REF_VALUES } from '@entities/image/consts';
import { SAUCE_CONTEXT } from '@entities/sauce/consts';
import { SauceFormDto } from '@entities/sauce/types';

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

  const searchClause = search ? ilike(sauces.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(sauces.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(sauces.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  let findSauces, total;

  try {
    [findSauces, [total]] = await Promise.all([
      db
        .select()
        .from(sauces)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() }).from(sauces).where(whereClause),
    ]);
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.GET_LIST_FAILED,
      context: SAUCE_CONTEXT.GET,
      payload: {
        searchParams,
      },
    });
  }
  return NextResponse.json(
    setSucResponseList({
      list: findSauces,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageId<SauceFormDto>;

  const { name, description, price, sortOrder, imageId, isHidden, isNew, isSignature } = body;

  let newSauce;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  try {
    [newSauce] = await db
      .insert(sauces)
      .values({
        name,
        description,
        price: Number(price),
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .returning();
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.CREATE_FAILED,
      context: SAUCE_CONTEXT.CREATE,
      payload: {
        body,
      },
    });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newSauce.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, IMAGE_REF_VALUES.SAUCE),
          isNull(imageReferences.refId),
        ),
      );
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

  return NextResponse.json(setSucResponseItem(newSauce), { status: 201 });
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(sauces.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(sauces.createdAt);
    case ORDER_BY_TYPES.PRICE_DESC:
      return desc(sauces.price);
    case ORDER_BY_TYPES.PRICE_ASC:
      return asc(sauces.price);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(sauces.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(sauces.sortOrder);
    default:
      return asc(sauces.sortOrder);
  }
};
