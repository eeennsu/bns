import db from '@db/index';
import {
  bundleBreads,
  bundleDishes,
  bundleDrinks,
  bundles,
  bundleSauces,
} from '@db/schemas/bundles';
import { imageReferences } from '@db/schemas/image';
import { ORDER_BY_TYPES } from '@shared/api/consts';
import { BUNDLE_ERRORS, IMAGE_ERRORS } from '@shared/api/errorMessage';
import { setSucResponseItem, setSucResponseList } from '@shared/api/response';
import { OrderByType, WithImageIds } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { FILTER_TYPES, PER_PAGE_SIZE } from '@shared/consts/commons';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { and, asc, count, desc, eq, ilike, inArray, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { BundleFormDto } from '@entities/bundle/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

export const GET = withAuth(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || 1;
  const pageSize = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE_SIZE)) || PER_PAGE_SIZE.DEFAULT;
  const showType = searchParams.get(SEARCH_PARAMS_KEYS.SHOW_TYPE) || FILTER_TYPES.ALL;
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || undefined;
  const orderClause = getOrderClause(orderBy as OrderByType);
  const search = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH) || '';

  const offset = (page - 1) * pageSize;

  const searchClause = search ? ilike(bundles.name, `%${search}%`) : undefined;
  const showTypeClause =
    showType === FILTER_TYPES.ON
      ? eq(bundles.isHidden, false)
      : showType === FILTER_TYPES.OFF
        ? eq(bundles.isHidden, true)
        : undefined;

  const whereClause = and(searchClause, showTypeClause);

  let findBundles, total;

  try {
    [findBundles, [total]] = await Promise.all([
      db
        .select()
        .from(bundles)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() }).from(bundles).where(whereClause),
    ]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }

  return NextResponse.json(
    setSucResponseList({
      list: findBundles,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageIds<BundleFormDto>;

  const { name, description, price, discountedPrice, productsList, imageIds, isHidden, sortOrder } =
    body;

  let newBundle;

  if (!imageIds || imageIds.length === 0) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  if (Object.keys(productsList).length === 0) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_PRODUCT }, { status: 400 });
  }

  try {
    [newBundle] = await db
      .insert(bundles)
      .values({
        name,
        description,
        price: Number(price),
        discountedPrice: Number(discountedPrice),
        sortOrder: Number(sortOrder),
        isHidden,
      })
      .returning();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.CREATE_FAILED }, { status: 500 });
  }

  try {
    const bundleId = newBundle.id;

    const breadsToInsert =
      productsList?.breads?.map(bread => ({
        bundleId,
        breadId: Number(bread.id),
        quantity: bread.quantity,
        sortOrder: bread?.sortOrder,
      })) ?? [];

    const saucesToInsert =
      productsList?.sauces?.map(sauce => ({
        bundleId,
        sauceId: Number(sauce.id),
        quantity: sauce.quantity,
        sortOrder: sauce.sortOrder,
      })) ?? [];

    const dishesToInsert =
      productsList?.dishes?.map(dish => ({
        bundleId,
        dishId: Number(dish.id),
        quantity: dish.quantity,
        sortOrder: dish.sortOrder,
      })) ?? [];

    const drinksToInsert =
      productsList?.drinks?.map(drink => ({
        bundleId,
        drinkId: Number(drink.id),
        quantity: drink.quantity,
        sortOrder: drink.sortOrder,
      })) ?? [];

    await Promise.all([
      breadsToInsert.length > 0 ? db.insert(bundleBreads).values(breadsToInsert) : null,
      saucesToInsert.length > 0 ? db.insert(bundleSauces).values(saucesToInsert) : null,
      dishesToInsert.length > 0 ? db.insert(bundleDishes).values(dishesToInsert) : null,
      drinksToInsert.length > 0 ? db.insert(bundleDrinks).values(drinksToInsert) : null,
    ]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.CREATE_PRODUCT_FAILED }, { status: 500 });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newBundle.id,
      })
      .where(
        and(
          eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE),
          isNull(imageReferences.refId),
          inArray(imageReferences.imageId, imageIds),
        ),
      )
      .returning();

    return NextResponse.json(setSucResponseItem(newBundle), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPLOAD }, { status: 500 });
  }
});

const getOrderClause = (orderBy?: OrderByType) => {
  switch (orderBy) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return desc(bundles.createdAt);
    case ORDER_BY_TYPES.CREATED_ASC:
      return asc(bundles.createdAt);
    case ORDER_BY_TYPES.PRICE_DESC:
      return desc(bundles.price);
    case ORDER_BY_TYPES.PRICE_ASC:
      return asc(bundles.price);
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return desc(bundles.sortOrder);
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return asc(bundles.sortOrder);
    default:
      return asc(bundles.sortOrder);
  }
};
