import db from '@db/index';
import { bundleBreads, bundleDishes, bundles, bundleSauces } from '@db/schemas/bundles';
import { imageReferences, images } from '@db/schemas/image';
import { BUNDLE_ERRORS } from '@shared/api/errorMessage';
import { deleteImageWithItem } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const bundleId = +(await params).id;

  if (!bundleId) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(bundleId)) {
    return NextResponse.json({ error: BUNDLE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [bundleResult, imageResult, ...productsResult] = await Promise.all([
    db.select().from(bundles).where(eq(bundles.id, bundleId)).limit(1),
    db
      .select({
        id: images.id,
        url: images.url,
        name: images.name,
      })
      .from(imageReferences)
      .innerJoin(images, eq(imageReferences.imageId, images.id))
      .where(
        and(
          eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE),
          eq(imageReferences.refId, bundleId),
        ),
      )
      .limit(1),
    db.select().from(bundleBreads).where(eq(bundleBreads.bundleId, bundleId)),
    db.select().from(bundleSauces).where(eq(bundleSauces.bundleId, bundleId)),
    db.select().from(bundleDishes).where(eq(bundleDishes.bundleId, bundleId)),
  ]);

  const [foundedBundle] = bundleResult;
  const bundleImages = imageResult;
  const [breadsBundles, sauceBundles, dishBundles] = productsResult;

  if (!foundedBundle) {
    return NextResponse.json({ error: BUNDLE_ERRORS.NOT_FOUND_BUNDLE }, { status: 400 });
  }

  const response = {
    ...foundedBundle,
    imageFiles: bundleImages ? [bundleImages] : [],
    productsList: {
      ...(breadsBundles.length > 0 && {
        breads: breadsBundles.map(bread => ({
          id: bread.breadId,
          quantity: bread.quantity,
          sortOrder: bread.sortOrder,
        })),
      }),
      ...(sauceBundles.length > 0 && {
        sauces: sauceBundles.map(sauce => ({
          id: sauce.sauceId,
          quantity: sauce.quantity,
          sortOrder: sauce.sortOrder,
        })),
      }),
      ...(dishBundles.length > 0 && {
        dishes: dishBundles.map(dish => ({
          id: dish.dishId,
          quantity: dish.quantity,
          sortOrder: dish.sortOrder,
        })),
      }),
    },
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const bundleId = +(await params).id;

  if (!bundleId) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(bundleId)) {
    return NextResponse.json({ error: BUNDLE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [foundedBundle] = await db.select().from(bundles).where(eq(bundles.id, bundleId)).limit(1);

  if (!foundedBundle) {
    return NextResponse.json({ error: BUNDLE_ERRORS.NOT_FOUND_BUNDLE }, { status: 400 });
  }

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

  await Promise.all(tasks);

  await deleteImageWithItem({
    refTable: IMAGE_REF_VALUES.BUNDLE,
    refId: bundleId,
    deleteItem: db.delete(bundles).where(eq(bundles.id, bundleId)),
  });

  return new NextResponse(null, { status: 204 });
});
