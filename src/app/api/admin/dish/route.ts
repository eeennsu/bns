import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences } from '@db/schemas/image';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { responseWithSentry } from '@shared/api/responseWithSentry';
import { withAuth } from '@shared/api/withAuth';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { and, asc, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DISH_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { OrderByType, WithImageId } from 'src/shared/api/typings';

import { DishFormDto } from '@entities/dish/types';
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

  const searchClause = search ? ilike(dishes.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(dishes.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(dishes.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  const [findDishes, [total]] = await Promise.all([
    db.select().from(dishes).where(whereClause).orderBy(orderClause).limit(pageSize).offset(offset),
    db.select({ count: count() }).from(dishes).where(whereClause),
  ]);

  return NextResponse.json(
    setSucResponseList({
      list: findDishes,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageId<DishFormDto>;

  const {
    name,
    description,
    price,
    ingredients,
    sortOrder,
    imageId,
    isHidden,
    isNew,
    isSignature,
  } = body;

  let newDish;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== 'string')) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_INGREDIENTS }, { status: 400 });
  }

  try {
    [newDish] = await db
      .insert(dishes)
      .values({
        name,
        description,
        price: Number(price),
        ingredients,
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .returning();
  } catch (error) {
    return responseWithSentry({
      error: DISH_ERRORS.CREATE_FAILED,
      context: 'CREATE_DISH',
      payload: error,
    });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newDish.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH),
          isNull(imageReferences.refId),
        ),
      );
  } catch (error) {
    return responseWithSentry({
      error: IMAGE_ERRORS.FAILED_UPLOAD,
      context: 'UPDATE_IMAGE',
      payload: error,
    });
  }

  return NextResponse.json(setSucResponseItem(newDish), { status: 201 });
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(dishes.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(dishes.createdAt);
    case ORDER_BY_TYPES.PRICE_DESC:
      return desc(dishes.price);
    case ORDER_BY_TYPES.PRICE_ASC:
      return asc(dishes.price);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(dishes.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(dishes.sortOrder);
    default:
      return asc(dishes.sortOrder);
  }
};
