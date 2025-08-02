import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { getLinkedBundlesByProduct } from '@shared/api/bundle';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithCapture } from '@shared/api/responseWithCapture';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { SAUCE_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_CONTEXT, IMAGE_REF_VALUES } from '@entities/image/consts';
import { SAUCE_CACHE_TAG, SAUCE_CONTEXT } from '@entities/sauce/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const sauceId = +(await params)?.id;

  if (!sauceId) {
    return NextResponse.json({ error: SAUCE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(sauceId)) {
    return NextResponse.json({ error: SAUCE_ERRORS.INVALID_ID }, { status: 400 });
  }

  let sauceResult, imageResult;

  try {
    [sauceResult, imageResult] = await Promise.all([
      db.select().from(sauces).where(eq(sauces.id, sauceId)).limit(1),
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
            eq(imageReferences.refTable, IMAGE_REF_VALUES.SAUCE),
            eq(imageReferences.refId, sauceId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.GET_FAILED,
      context: SAUCE_CONTEXT.GET,
      payload: {
        sauceId,
      },
    });
  }

  const [foundedSauce] = sauceResult;
  const [sauceImage] = imageResult;

  if (!foundedSauce) {
    return NextResponse.json({ error: SAUCE_ERRORS.NOT_FOUND_SAUCE }, { status: 400 });
  }

  const response = {
    ...foundedSauce,
    imageFiles: sauceImage ? [sauceImage] : [],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (req: NextRequest, { params }: IParams) => {
  const sauceId = +(await params)?.id;

  if (!sauceId) {
    return NextResponse.json({ error: SAUCE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(sauceId)) {
    return NextResponse.json({ error: SAUCE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = await req.json();
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, sortOrder, isHidden, isNew, isSignature } = body;

  let updateSauce;

  try {
    updateSauce = await db
      .update(sauces)
      .set({
        name,
        description,
        price: Number(price),
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .where(eq(sauces.id, sauceId))
      .returning();
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.MODIFY_FAILED,
      context: SAUCE_CONTEXT.MODIFY,
      payload: {
        sauceId,
        body,
      },
    });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.SAUCE,
      refId: sauceId,
      imageId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS,
      context: IMAGE_CONTEXT.UPDATE,
      payload: {
        sauceId,
        body,
      },
    });
  }

  revalidateTag(`${SAUCE_CACHE_TAG.GET}:${sauceId}`);
  revalidateTag(SAUCE_CACHE_TAG.GET_LIST);

  return NextResponse.json(setSucResponseItem(updateSauce));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const sauceId = +(await params)?.id;

  if (!sauceId) {
    return NextResponse.json({ error: SAUCE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(sauceId)) {
    return NextResponse.json({ error: SAUCE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const linkedBundles = await getLinkedBundlesByProduct(sauceId, 'sauce');
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
    const [foundedSauce] = await db.select().from(sauces).where(eq(sauces.id, sauceId)).limit(1);

    if (!foundedSauce) {
      return NextResponse.json({ error: SAUCE_ERRORS.NOT_FOUND_SAUCE }, { status: 400 });
    }
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.GET_FAILED,
      context: SAUCE_CONTEXT.GET,
      payload: {
        sauceId,
      },
    });
  }

  try {
    await db.delete(sauces).where(eq(sauces.id, sauceId));
  } catch (error) {
    return responseWithCapture({
      error,
      message: SAUCE_ERRORS.DELETE_FAILED,
      context: SAUCE_CONTEXT.DELETE,
      payload: {
        sauceId,
      },
    });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.SAUCE,
      refId: sauceId,
    });
  } catch (error) {
    return responseWithCapture({
      error,
      message: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS,
      context: IMAGE_CONTEXT.DELETE,
      payload: {
        sauceId,
      },
    });
  }

  revalidateTag(`${SAUCE_CACHE_TAG.GET}:${sauceId}`);
  revalidateTag(SAUCE_CACHE_TAG.GET_LIST);

  return new NextResponse(null, { status: 204 });
});
