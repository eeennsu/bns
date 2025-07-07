import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { dishes } from '@db/schemas/dishes';
import { sauces } from '@db/schemas/sauces';
import { BUNDLE_ERRORS } from '@shared/api/errorMessage';
import { setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

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

    const [_breads, _sauces, _dishes] = await Promise.all([breadsQuery, sauceQuery, dishQuery]);

    return NextResponse.json(
      setSucResponseItem({
        breads: _breads,
        sauces: _sauces,
        dishes: _dishes,
      }),
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.GET_PRODUCT_LIST_FAILED }, { status: 500 });
  }
});
