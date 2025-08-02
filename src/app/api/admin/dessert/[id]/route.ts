import db from '@db/index';
import { desserts } from '@db/schemas/desserts';
import { imageReferences, images } from '@db/schemas/image';
import { getLinkedBundlesByProduct } from '@shared/api/bundle';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DESSERT_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { DESSERT_CONTEXT } from '@entities/dessert/consts';
import { IMAGE_CONTEXT, IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const dessertId = +(await params)?.id;

  if (!dessertId) {
    return NextResponse.json({ error: DESSERT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dessertId)) {
    return NextResponse.json({ error: DESSERT_ERRORS.INVALID_ID }, { status: 400 });
  }

  let dessertResult, imageResult;

  try {
    [dessertResult, imageResult] = await Promise.all([
      db.select().from(desserts).where(eq(desserts.id, dessertId)).limit(1),
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
            eq(imageReferences.refTable, IMAGE_REF_VALUES.DESSERT),
            eq(imageReferences.refId, dessertId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    return responseWithCapture({
      error,
      message: DESSERT_ERRORS.GET_FAILED,
      context: DESSERT_CONTEXT.GET,
      payload: {
        dessertId,
      },
    });
  }

  const [foundedDessert] = dessertResult;
  const [dessertImage] = imageResult;

  if (!foundedDessert) {
    return NextResponse.json({ error: DESSERT_ERRORS.NOT_FOUND_DESSERT }, { status: 400 });
  }

  const response = {
    ...foundedDessert,
    imageFiles: dessertImage ? [dessertImage] : [],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (req: NextRequest, { params }: IParams) => {
  const dessertId = +(await params)?.id;

  if (!dessertId) {
    return NextResponse.json({ error: DESSERT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dessertId)) {
    return NextResponse.json({ error: DESSERT_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = await req.json();
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, sortOrder, isHidden, isNew, isSignature } = body;

  let updateDessert;

  try {
    updateDessert = await db
      .update(desserts)
      .set({
        name,
        description,
        price: Number(price),
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .where(eq(desserts.id, dessertId))
      .returning();
  } catch (error) {
    return responseWithCapture({
      error,
      message: DESSERT_ERRORS.MODIFY_FAILED,
      context: DESSERT_CONTEXT.MODIFY,
      payload: {
        dessertId,
        body,
      },
    });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.DESSERT,
      refId: dessertId,
      imageId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS,
      context: IMAGE_CONTEXT.UPDATE,
      payload: {
        dessertId,
        body,
      },
    });
  }

  return NextResponse.json(setSucResponseItem(updateDessert));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const dessertId = +(await params)?.id;

  if (!dessertId) {
    return NextResponse.json({ error: DESSERT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dessertId)) {
    return NextResponse.json({ error: DESSERT_ERRORS.INVALID_ID }, { status: 400 });
  }

  const linkedBundles = await getLinkedBundlesByProduct(dessertId, 'dessert');
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
    const [foundedDessert] = await db
      .select()
      .from(desserts)
      .where(eq(desserts.id, dessertId))
      .limit(1);

    if (!foundedDessert) {
      return NextResponse.json({ error: DESSERT_ERRORS.NOT_FOUND_DESSERT }, { status: 400 });
    }
  } catch (error) {
    return responseWithCapture({
      error,
      message: DESSERT_ERRORS.GET_FAILED,
      context: DESSERT_CONTEXT.GET,
      payload: {
        dessertId,
      },
    });
  }

  try {
    await db.delete(desserts).where(eq(desserts.id, dessertId));
  } catch (error) {
    return responseWithCapture({
      error,
      message: DESSERT_ERRORS.DELETE_FAILED,
      context: DESSERT_CONTEXT.DELETE,
      payload: {
        dessertId,
      },
    });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.DESSERT,
      refId: dessertId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS,
      context: IMAGE_CONTEXT.DELETE,
      payload: {
        dessertId,
      },
    });
  }

  return new NextResponse(null, { status: 204 });
});
