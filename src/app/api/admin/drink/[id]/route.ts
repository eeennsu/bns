import db from '@db/index';
import { drinks } from '@db/schemas/drinks';
import { imageReferences, images } from '@db/schemas/image';
import { getLinkedBundlesByProduct } from '@shared/api/bundle';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DRINK_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const drinkId = +(await params)?.id;

  if (!drinkId) {
    return NextResponse.json({ error: DRINK_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(drinkId)) {
    return NextResponse.json({ error: DRINK_ERRORS.INVALID_ID }, { status: 400 });
  }

  let drinkResult, imageResult;

  try {
    [drinkResult, imageResult] = await Promise.all([
      db.select().from(drinks).where(eq(drinks.id, drinkId)).limit(1),
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
            eq(imageReferences.refTable, IMAGE_REF_VALUES.DRINK),
            eq(imageReferences.refId, drinkId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    return responseWithCapture({
      error,
      message: DRINK_ERRORS.GET_FAILED,
      context: 'GET_DRINK',
      payload: {
        drinkId,
      },
    });
  }

  const [foundedDrink] = drinkResult;
  const [drinkImage] = imageResult;

  if (!foundedDrink) {
    return NextResponse.json({ error: DRINK_ERRORS.NOT_FOUND_DRINK }, { status: 400 });
  }

  const response = {
    ...foundedDrink,
    imageFiles: drinkImage ? [drinkImage] : [],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (req: NextRequest, { params }: IParams) => {
  const drinkId = +(await params)?.id;

  if (!drinkId) {
    return NextResponse.json({ error: DRINK_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(drinkId)) {
    return NextResponse.json({ error: DRINK_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = await req.json();
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, sortOrder, isHidden, isNew, isSignature } = body;

  let updateDrink;

  try {
    updateDrink = await db
      .update(drinks)
      .set({
        name,
        description,
        price: Number(price),
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .where(eq(drinks.id, drinkId))
      .returning();
  } catch (error) {
    return responseWithCapture({
      error,
      message: DRINK_ERRORS.MODIFY_FAILED,
      context: 'MODIFY_DRINK',
      payload: {
        drinkId,
        body,
      },
    });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.DRINK,
      refId: drinkId,
      imageId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS,
      context: 'UPDATE_IMAGE_DATAS',
      payload: {
        drinkId,
        body,
      },
    });
  }

  return NextResponse.json(setSucResponseItem(updateDrink));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const drinkId = +(await params)?.id;

  if (!drinkId) {
    return NextResponse.json({ error: DRINK_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(drinkId)) {
    return NextResponse.json({ error: DRINK_ERRORS.INVALID_ID }, { status: 400 });
  }

  const linkedBundles = await getLinkedBundlesByProduct(drinkId, 'drink');
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
    const [foundedDrink] = await db.select().from(drinks).where(eq(drinks.id, drinkId)).limit(1);

    if (!foundedDrink) {
      return NextResponse.json({ error: DRINK_ERRORS.NOT_FOUND_DRINK }, { status: 400 });
    }
  } catch (error) {
    return responseWithCapture({
      error,
      message: DRINK_ERRORS.GET_FAILED,
      context: 'GET_DRINK',
      payload: {
        drinkId,
      },
    });
  }

  try {
    await db.delete(drinks).where(eq(drinks.id, drinkId));
  } catch (error) {
    return responseWithCapture({
      error,
      message: DRINK_ERRORS.DELETE_FAILED,
      context: 'DELETE_DRINK',
      payload: {
        drinkId,
      },
    });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.DRINK,
      refId: drinkId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS,
      context: 'DELETE_IMAGE_DATAS',
      payload: {
        drinkId,
      },
    });
  }

  return new NextResponse(null, { status: 204 });
});
