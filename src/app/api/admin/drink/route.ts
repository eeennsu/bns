import db from '@db/index';
import { drinks } from '@db/schemas/drinks';
import { imageReferences } from '@db/schemas/image';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { and, asc, count, desc, eq, ilike, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DRINK_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { OrderByType, WithImageId } from 'src/shared/api/typings';

import { DrinkFormDto } from '@entities/drink/types';
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

  const searchClause = search ? ilike(drinks.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(drinks.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(drinks.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  let findDrinks, total;

  try {
    [findDrinks, [total]] = await Promise.all([
      db
        .select()
        .from(drinks)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() }).from(drinks).where(whereClause),
    ]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: DRINK_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
  return NextResponse.json(
    setSucResponseList({
      list: findDrinks,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageId<DrinkFormDto>;

  const { name, description, price, sortOrder, imageId, isHidden, isNew, isSignature } = body;

  let newDrink;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  try {
    [newDrink] = await db
      .insert(drinks)
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
    console.error('Error inserting drink:', error);
    return NextResponse.json({ error: DRINK_ERRORS.CREATE_FAILED }, { status: 500 });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newDrink.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, IMAGE_REF_VALUES.DRINK),
          isNull(imageReferences.refId),
        ),
      );
  } catch (error) {
    console.error('Error inserting image:', error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPLOAD }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(newDrink), { status: 201 });
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(drinks.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(drinks.createdAt);
    case ORDER_BY_TYPES.PRICE_DESC:
      return desc(drinks.price);
    case ORDER_BY_TYPES.PRICE_ASC:
      return asc(drinks.price);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(drinks.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(drinks.sortOrder);
    default:
      return asc(drinks.sortOrder);
  }
};
