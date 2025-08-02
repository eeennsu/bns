import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { desserts } from '@db/schemas/desserts';
import { dishes } from '@db/schemas/dishes';
import { drinks } from '@db/schemas/drinks';
import { sauces } from '@db/schemas/sauces';
import { mapWithType } from '@shared/api/bundle';
import { BUNDLE_ERRORS } from '@shared/api/errorMessage';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { BUNDLE_CONTEXT, BUNDLE_PRODUCT_TYPE } from '@entities/bundle/consts';

export const GET = withAuth(async () => {
  try {
    const breadsQuery = db
      .select({
        id: breads.id,
        name: breads.name,
        price: breads.price,
      })
      .from(breads)
      .orderBy(asc(breads.price));

    const sauceQuery = db
      .select({
        id: sauces.id,
        name: sauces.name,
        price: sauces.price,
      })
      .from(sauces)
      .orderBy(asc(sauces.price));

    const dishQuery = db
      .select({ id: dishes.id, name: dishes.name, price: dishes.price })
      .from(dishes)
      .orderBy(asc(dishes.price));

    const drinkQuery = db
      .select({ id: drinks.id, name: drinks.name, price: drinks.price })
      .from(drinks)
      .orderBy(asc(drinks.price));

    const dessertQuery = db
      .select({ id: desserts.id, name: desserts.name, price: desserts.price })
      .from(desserts)
      .orderBy(asc(desserts.price));

    const [_breads, _sauces, _dishes, _drinks, _desserts] = await Promise.all([
      breadsQuery,
      sauceQuery,
      dishQuery,
      drinkQuery,
      dessertQuery,
    ]);

    const allProducts = [
      ...mapWithType(_breads, BUNDLE_PRODUCT_TYPE.BREAD),
      ...mapWithType(_sauces, BUNDLE_PRODUCT_TYPE.SAUCE),
      ...mapWithType(_dishes, BUNDLE_PRODUCT_TYPE.DISH),
      ...mapWithType(_drinks, BUNDLE_PRODUCT_TYPE.DRINK),
      ...mapWithType(_desserts, BUNDLE_PRODUCT_TYPE.DESSERT),
    ];

    return NextResponse.json(setSucResponseItem(allProducts));
  } catch (error) {
    return responseWithCapture({
      error,
      message: BUNDLE_ERRORS.GET_PRODUCT_LIST_FAILED,
      context: BUNDLE_CONTEXT.GET_PRODUCT_LIST,
    });
  }
});
