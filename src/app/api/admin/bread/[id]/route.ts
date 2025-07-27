import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { getLinkedBundlesByProduct } from '@shared/api/bundle';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { responseWithSentry } from '@shared/api/responseWithSentry';
import { WithImageId } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { BreadFormDto } from '@entities/bread/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const breadId = +(await params)?.id;

  if (!breadId) {
    return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(breadId)) {
    return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
  }

  let breadResult, imageResult;

  try {
    [breadResult, imageResult] = await Promise.all([
      db.select().from(breads).where(eq(breads.id, breadId)).limit(1),
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
            eq(imageReferences.refTable, IMAGE_REF_VALUES.BREAD),
            eq(imageReferences.refId, breadId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    return responseWithSentry({
      error,
      context: 'GET_BREAD',
      message: BREAD_ERRORS.GET_FAILED,
      payload: {
        breadId,
      },
    });
  }

  const [foundedBread] = breadResult;
  const [breadImage] = imageResult;

  if (!foundedBread) {
    return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
  }

  const response = {
    ...foundedBread,
    imageFiles: breadImage ? [breadImage] : [],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (request: NextRequest, { params }: IParams) => {
  const breadId = +(await params)?.id;

  if (!breadId) {
    return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(breadId)) {
    return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = (await request.json()) as Partial<WithImageId<BreadFormDto>>;
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, price, mbti, sortOrder, isHidden, isNew, isSignature } = body;

  let updateBread;

  try {
    updateBread = await db
      .update(breads)
      .set({
        name,
        description,
        price: Number(price),
        mbti,
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .where(eq(breads.id, breadId))
      .returning();
  } catch (error) {
    return responseWithSentry({
      error,
      message: BREAD_ERRORS.MODIFY_FAILED,
      context: 'UPDATE_BREAD',
      payload: {
        breadId,
        body,
      },
    });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.BREAD,
      refId: breadId,
      imageId,
    });
  } catch (error) {
    return responseWithSentry({
      error,
      message: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS,
      context: 'UPDATE_BREAD_IMAGE',
      payload: {
        breadId,
        body,
      },
    });
  }

  return NextResponse.json(setSucResponseItem(updateBread));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const breadId = +(await params)?.id;

  if (!breadId) {
    return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(breadId)) {
    return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
  }

  const linkedBundles = await getLinkedBundlesByProduct(breadId, 'bread');
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
    const [foundedBread] = await db.select().from(breads).where(eq(breads.id, breadId)).limit(1);

    if (!foundedBread) {
      return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
    }
  } catch (error) {
    return responseWithSentry({
      error,
      message: BREAD_ERRORS.GET_FAILED,
      context: 'GET_BREAD',
      payload: {
        breadId,
      },
    });
  }

  try {
    await db.delete(breads).where(eq(breads.id, breadId));
  } catch (error) {
    return responseWithSentry({
      error,
      message: BREAD_ERRORS.DELETE_FAILED,
      context: 'DELETE_BREAD',
      payload: {
        breadId,
        linkedBundles,
      },
    });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.BREAD,
      refId: breadId,
    });
  } catch (error) {
    return responseWithSentry({
      error,
      message: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS,
      context: 'DELETE_BREAD_IMAGE',
      payload: {
        breadId,
        linkedBundles,
      },
    });
  }

  return new NextResponse(null, { status: 204 });
});
