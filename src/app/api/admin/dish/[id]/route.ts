import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences, images } from '@db/schemas/image';
import { getLinkedBundlesByProduct } from '@shared/api/bundle';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithSentry } from '@shared/api/responseWithSentry';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DISH_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const dishId = +(await params)?.id;

  if (!dishId) {
    return NextResponse.json({ error: DISH_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dishId)) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_ID }, { status: 400 });
  }

  let dishResult, imageResult;

  try {
    [dishResult, imageResult] = await Promise.all([
      db.select().from(dishes).where(eq(dishes.id, dishId)).limit(1),
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
            eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH),
            eq(imageReferences.refId, dishId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    return responseWithSentry({
      error: DISH_ERRORS.GET_FAILED,
      context: 'GET_DISH',
      payload: error,
    });
  }

  const [foundedDish] = dishResult;
  const [dishImage] = imageResult;

  if (!foundedDish) {
    return NextResponse.json({ error: DISH_ERRORS.NOT_FOUND_DISH }, { status: 400 });
  }

  const response = {
    ...foundedDish,
    imageFiles: dishImage ? [dishImage] : [],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (req: NextRequest, { params }: IParams) => {
  const dishId = +(await params)?.id;

  if (!dishId) {
    return NextResponse.json({ error: DISH_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dishId)) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = await req.json();
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, ingredients, sortOrder, isHidden, isNew, isSignature } = body;

  let updateDish;

  try {
    updateDish = await db
      .update(dishes)
      .set({
        name,
        description,
        price: Number(price),
        ingredients,
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .where(eq(dishes.id, dishId))
      .returning();
  } catch (error) {
    return responseWithSentry({
      error: DISH_ERRORS.MODIFY_FAILED,
      context: 'MODIFY_DISH',
      payload: error,
    });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.DISH,
      refId: dishId,
      imageId,
    });
  } catch (error) {
    return responseWithSentry({
      error: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS,
      context: 'UPDATE_IMAGE',
      payload: error,
    });
  }

  return NextResponse.json(setSucResponseItem(updateDish));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const dishId = +(await params)?.id;

  if (!dishId) {
    return NextResponse.json({ error: DISH_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dishId)) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_ID }, { status: 400 });
  }

  const linkedBundles = await getLinkedBundlesByProduct(dishId, 'dish');
  if (linkedBundles.length > 0) {
    const names = linkedBundles.map(b => b.name).join(', ');
    return NextResponse.json(
      {
        error: `세트 구성 상품 (${names})에 포함되어있습니다. 해당 세트 구성의 품목을 먼저 삭제해주세요.`,
      },
      { status: 400 },
    );
  }

  try {
    const [foundedDish] = await db.select().from(dishes).where(eq(dishes.id, dishId)).limit(1);

    if (!foundedDish) {
      return NextResponse.json({ error: DISH_ERRORS.NOT_FOUND_DISH }, { status: 400 });
    }
  } catch (error) {
    return responseWithSentry({
      error: DISH_ERRORS.GET_FAILED,
      context: 'GET_DISH',
      payload: error,
    });
  }

  try {
    await db.delete(dishes).where(eq(dishes.id, dishId));
  } catch (error) {
    return responseWithSentry({
      error: DISH_ERRORS.DELETE_FAILED,
      context: 'DELETE_DISH',
      payload: error,
    });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.DISH,
      refId: dishId,
    });
  } catch (error) {
    return responseWithSentry({
      error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS,
      context: 'DELETE_IMAGE',
      payload: error,
    });
  }

  return new NextResponse(null, { status: 204 });
});
