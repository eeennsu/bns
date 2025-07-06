import db from '@db/index';
import { bundleBreads, bundleDishes, bundles, bundleSauces } from '@db/schemas/bundles';
import { BUNDLE_ERRORS, IMAGE_ERRORS } from '@shared/api/errorMessage';
import { WithImageIds } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { NextRequest, NextResponse } from 'next/server';

import { BundleFormDto } from '@entities/bundle/types';
import { setSucResponseItem } from '@shared/api/response';

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

    const bundleId = newBundle.id;

    const breadsToInsert = productsList.breads?.map((bread, index) => ({
      bundleId,
      breadId: Number(bread.id),
      quantity: bread.quantity,
      sortOrder: bread?.sortOrder ?? index + 1,
    }));

    const saucesToInsert = productsList.sauces?.map((sauce, index) => ({
      bundleId,
      sauceId: Number(sauce.id),
      quantity: sauce.quantity,
      sortOrder: sauce.sortOrder ?? index + 1,
    }));

    const dishesToInsert = productsList.dishes?.map((dish, index) => ({
      bundleId,
      dishId: Number(dish.id),
      quantity: dish.quantity,
      sortOrder: dish.sortOrder ?? index + 1,
    }));

    await Promise.all([
      breadsToInsert.length > 0 ? db.insert(bundleBreads).values(breadsToInsert) : null,
      saucesToInsert.length > 0 ? db.insert(bundleSauces).values(saucesToInsert) : null,
      dishesToInsert.length > 0 ? db.insert(bundleDishes).values(dishesToInsert) : null,
    ]);

    return NextResponse.json(setSucResponseItem(newBundle), { status: 201 });
  } catch (error) {
    console.error(error);
  }
});
