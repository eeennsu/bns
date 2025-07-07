import db from '@db/index';
import { bundleBreads, bundleDishes, bundles, bundleSauces } from '@db/schemas/bundles';
import { imageReferences, images } from '@db/schemas/image';
import { BUNDLE_ERRORS, IMAGE_ERRORS } from '@shared/api/errorMessage';
import { deleteImageWithItem, updateImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { WithImageIds } from '@shared/api/typings';
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
        })
        .from(imageReferences)
        .innerJoin(images, eq(imageReferences.imageId, images.id))
        .where(
          and(
            eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE),
            eq(imageReferences.refId, bundleId),
          ),
        ),
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

    response = {
      ...foundedBundle,
      imageFiles: bundleImages ?? [],
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

  const body = (await request.json()) as Partial<WithImageIds<BundleFormDto>>;
  const imageIdsWithSortOrder = body?.imageIds;

  if (!imageIdsWithSortOrder) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, discountedPrice, productsList, sortOrder, isHidden } = body;

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
    if (productsList) {
      // 2. 기존 제품 연결 삭제
      await Promise.all([
        db.delete(bundleBreads).where(eq(bundleBreads.bundleId, bundleId)),
        db.delete(bundleSauces).where(eq(bundleSauces.bundleId, bundleId)),
        db.delete(bundleDishes).where(eq(bundleDishes.bundleId, bundleId)),
      ]);

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

      await Promise.all([
        breadsToInsert.length > 0 ? db.insert(bundleBreads).values(breadsToInsert) : null,
        saucesToInsert.length > 0 ? db.insert(bundleSauces).values(saucesToInsert) : null,
        dishesToInsert.length > 0 ? db.insert(bundleDishes).values(dishesToInsert) : null,
      ]);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BUNDLE_ERRORS.MODIFY_PRODUCT_FAILED }, { status: 500 });
  }

  try {
    await updateImageReference({
      refTable: IMAGE_REF_VALUES.BUNDLE,
      refId: bundleId,
      imageIds: imageIdsWithSortOrder.map(image => image.id),
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
    await deleteImageWithItem({
      refTable: IMAGE_REF_VALUES.BUNDLE,
      refId: bundleId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});
