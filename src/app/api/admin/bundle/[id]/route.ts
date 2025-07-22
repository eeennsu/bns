import db from '@db/index';
import {
  bundleBreads,
  bundleDishes,
  bundleDrinks,
  bundles,
  bundleSauces,
} from '@db/schemas/bundles';
import { imageReferences, images } from '@db/schemas/image';
import { mapWithType, updateBundleProductsDiff } from '@shared/api/bundle';
import { BUNDLE_ERRORS, IMAGE_ERRORS } from '@shared/api/errorMessage';
import { deleteImage, updateMultiImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { WithImageIdsSortOrder } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { BundleFormDto } from '@entities/bundle/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const bundleId = +(await params)?.id;

  if (!bundleId) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(bundleId)) {
    return NextResponse.json({ error: BUNDLE_ERRORS.INVALID_ID }, { status: 400 });
  }

  let bundleResult, imageResult, productsResult, response;

  try {
    [bundleResult, imageResult, ...productsResult] = await Promise.all([
      db.select().from(bundles).where(eq(bundles.id, bundleId)).limit(1),
      db
        .select({
          id: images.id,
          url: images.url,
          name: images.name,
          sortOrder: imageReferences.sortOrder,
        })
        .from(imageReferences)
        .innerJoin(images, eq(imageReferences.imageId, images.id))
        .where(
          and(
            eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE),
            eq(imageReferences.refId, bundleId),
          ),
        ),
      db
        .select({
          id: bundleBreads.id,
          breadId: bundleBreads.breadId,
          quantity: bundleBreads.quantity,
          sortOrder: bundleBreads.sortOrder,
        })
        .from(bundleBreads)
        .where(eq(bundleBreads.bundleId, bundleId)),
      db
        .select({
          id: bundleSauces.id,
          sauceId: bundleSauces.sauceId,
          quantity: bundleSauces.quantity,
          sortOrder: bundleSauces.sortOrder,
        })
        .from(bundleSauces)
        .where(eq(bundleSauces.bundleId, bundleId)),
      db
        .select({
          id: bundleDishes.id,
          dishId: bundleDishes.dishId,
          quantity: bundleDishes.quantity,
          sortOrder: bundleDishes.sortOrder,
        })
        .from(bundleDishes)
        .where(eq(bundleDishes.bundleId, bundleId)),
      db
        .select({
          id: bundleDrinks.id,
          drinkId: bundleDrinks.drinkId,
          quantity: bundleDrinks.quantity,
          sortOrder: bundleDrinks.sortOrder,
        })
        .from(bundleDrinks)
        .where(eq(bundleDrinks.bundleId, bundleId)),
    ]);

    const [foundedBundle] = bundleResult;
    const bundleImages = imageResult?.sort((prev, next) => prev?.sortOrder - next?.sortOrder);
    const [breadsBundles, sauceBundles, dishBundles, drinkBundles] = productsResult;

    if (!foundedBundle) {
      return NextResponse.json({ error: BUNDLE_ERRORS.NOT_FOUND_BUNDLE }, { status: 400 });
    }

    response = {
      ...foundedBundle,
      imageFiles: bundleImages ?? [],
      products: [
        ...mapWithType(breadsBundles, 'bread'),
        ...mapWithType(sauceBundles, 'sauce'),
        ...mapWithType(dishBundles, 'dish'),
        ...mapWithType(drinkBundles, 'drink'),
      ],
    };
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.CREATE_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (request: NextRequest, { params }: IParams) => {
  const bundleId = +(await params)?.id;

  if (!bundleId) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(bundleId)) {
    return NextResponse.json({ error: BUNDLE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = (await request.json()) as Partial<WithImageIdsSortOrder<BundleFormDto>>;
  const imageIdsWithSortOrder = body?.imageIdsWithSortOrder;

  if (!imageIdsWithSortOrder) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, discountedPrice, products, sortOrder, isHidden } = body;

  let updateBundle;

  try {
    updateBundle = await db
      .update(bundles)
      .set({
        name,
        description,
        price: Number(price),
        discountedPrice: Number(discountedPrice),
        sortOrder: Number(sortOrder),
        isHidden,
      })
      .where(eq(bundles.id, bundleId))
      .returning();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  // update bundle products
  try {
    if (products) {
      await updateBundleProductsDiff(bundleId, products);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.MODIFY_PRODUCT_FAILED }, { status: 500 });
  }

  // update image
  try {
    await updateMultiImageReference({
      refTable: IMAGE_REF_VALUES.BUNDLE,
      refId: bundleId,
      imageIdsWithSortOrder,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(updateBundle));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const bundleId = +(await params)?.id;

  if (!bundleId) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(bundleId)) {
    return NextResponse.json({ error: BUNDLE_ERRORS.INVALID_ID }, { status: 400 });
  }

  try {
    const [foundedBundle] = await db
      .select()
      .from(bundles)
      .where(eq(bundles.id, bundleId))
      .limit(1);

    if (!foundedBundle) {
      return NextResponse.json({ error: BUNDLE_ERRORS.NOT_FOUND_BUNDLE }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.GET_FAILED }, { status: 500 });
  }

  try {
    const tasks: Promise<unknown>[] = [];

    const hasBreads = await db
      .select()
      .from(bundleBreads)
      .where(eq(bundleBreads.bundleId, bundleId))
      .limit(1);
    if (hasBreads.length > 0) {
      tasks.push(db.delete(bundleBreads).where(eq(bundleBreads.bundleId, bundleId)));
    }

    const hasDishes = await db
      .select()
      .from(bundleDishes)
      .where(eq(bundleDishes.bundleId, bundleId))
      .limit(1);
    if (hasDishes.length > 0) {
      tasks.push(db.delete(bundleDishes).where(eq(bundleDishes.bundleId, bundleId)));
    }

    const hasSauces = await db
      .select()
      .from(bundleSauces)
      .where(eq(bundleSauces.bundleId, bundleId))
      .limit(1);
    if (hasSauces.length > 0) {
      tasks.push(db.delete(bundleSauces).where(eq(bundleSauces.bundleId, bundleId)));
    }

    const hasDrinks = await db
      .select()
      .from(bundleDrinks)
      .where(eq(bundleDrinks.bundleId, bundleId))
      .limit(1);
    if (hasDrinks.length > 0) {
      tasks.push(db.delete(bundleDrinks).where(eq(bundleDrinks.bundleId, bundleId)));
    }

    await Promise.all(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.DELETE_FAILED }, { status: 500 });
  }

  try {
    await db.delete(bundles).where(eq(bundles.id, bundleId));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.DELETE_FAILED }, { status: 500 });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.BUNDLE,
      refId: bundleId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});
