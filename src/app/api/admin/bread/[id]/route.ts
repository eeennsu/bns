import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { deleteImage, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
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
    console.log(error);
    return NextResponse.json({ error: BREAD_ERRORS.GET_FAILED }, { status: 500 });
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
    console.log(error);
    return NextResponse.json({ error: BREAD_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.BREAD,
      refId: breadId,
      imageId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS }, { status: 500 });
  }

  console.log('updateBread', updateBread);

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

  try {
    const [foundedBread] = await db.select().from(breads).where(eq(breads.id, breadId)).limit(1);

    if (!foundedBread) {
      return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BREAD_ERRORS.GET_FAILED }, { status: 500 });
  }

  try {
    await db.delete(breads).where(eq(breads.id, breadId));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: BREAD_ERRORS.DELETE_FAILED }, { status: 500 });
  }

  try {
    await deleteImage({
      refTable: IMAGE_REF_VALUES.BREAD,
      refId: breadId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});
