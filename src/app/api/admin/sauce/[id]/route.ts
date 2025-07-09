import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { deleteImageWithItem, updateSingleImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { SAUCE_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

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
    console.log(error);
    return NextResponse.json({ error: SAUCE_ERRORS.GET_FAILED }, { status: 500 });
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
  console.log('body', body);
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
    console.log(error);
    return NextResponse.json({ error: SAUCE_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  try {
    await updateSingleImageReference({
      refTable: IMAGE_REF_VALUES.SAUCE,
      refId: sauceId,
      imageId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS }, { status: 500 });
  }

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

  try {
    const [foundedSauce] = await db.select().from(sauces).where(eq(sauces.id, sauceId)).limit(1);

    if (!foundedSauce) {
      return NextResponse.json({ error: SAUCE_ERRORS.NOT_FOUND_SAUCE }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: SAUCE_ERRORS.GET_FAILED }, { status: 500 });
  }

  try {
    await db.delete(sauces).where(eq(sauces.id, sauceId));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: SAUCE_ERRORS.DELETE_FAILED }, { status: 500 });
  }

  try {
    await deleteImageWithItem({
      refTable: IMAGE_REF_VALUES.SAUCE,
      refId: sauceId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});
