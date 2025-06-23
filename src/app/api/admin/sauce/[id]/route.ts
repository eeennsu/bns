import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { defaultResponse, setSucResponseData } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { SAUCE_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: Params) => {
  const sauceId = +(await params).id;

  if (!sauceId) {
    return NextResponse.json({ error: SAUCE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(sauceId)) {
    return NextResponse.json({ error: SAUCE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [sauceResult, imageResult] = await Promise.all([
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

  const [foundedSauce] = sauceResult;
  const [sauceImage] = imageResult;

  if (!foundedSauce) {
    return NextResponse.json({ error: SAUCE_ERRORS.NOT_FOUND_SAUCE }, { status: 400 });
  }
  if (!sauceImage) {
    return NextResponse.json({ error: IMAGE_ERRORS.NOT_FOUND }, { status: 400 });
  }

  const response = {
    ...foundedSauce,
    imageFiles: sauceImage ? [sauceImage] : [],
  };

  return NextResponse.json(setSucResponseData(response));
});

export const PUT = withAuth(async (req: NextRequest, { params }: Params) => {
  const sauceId = +(await params).id;

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

  const [existingImageRef] = await db
    .select({
      id: imageReferences.id,
      imageId: imageReferences.imageId,
    })
    .from(imageReferences)
    .where(
      and(eq(imageReferences.refTable, IMAGE_REF_VALUES.SAUCE), eq(imageReferences.refId, sauceId)),
    )
    .limit(1);

  if (existingImageRef?.imageId !== imageId) {
    if (existingImageRef) {
      await Promise.all([
        db.delete(imageReferences).where(eq(imageReferences.id, existingImageRef.id)),
        db.delete(images).where(eq(images.id, existingImageRef.imageId)),
      ]);
    }

    await db
      .update(imageReferences)
      .set({ refId: sauceId })
      .where(eq(imageReferences.imageId, imageId));
  }

  const { name, description, price, sortOrder, isHidden, isNew, isSignature } = body;

  const updateSauce = await db
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
    .where(eq(sauces.id, sauceId));

  if (!updateSauce) {
    return NextResponse.json({ error: SAUCE_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseData(updateSauce));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: Params) => {
  const sauceId = +(await params).id;

  if (!sauceId) {
    return NextResponse.json({ error: SAUCE_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(sauceId)) {
    return NextResponse.json({ error: SAUCE_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [foundedSauce] = await db.select().from(sauces).where(eq(sauces.id, sauceId)).limit(1);

  if (!foundedSauce) {
    return NextResponse.json({ error: SAUCE_ERRORS.NOT_FOUND_SAUCE }, { status: 400 });
  }

  const [imageRef] = await db
    .select()
    .from(imageReferences)
    .where(eq(imageReferences.refId, sauceId));

  await Promise.all(
    [
      imageRef?.id ? db.delete(images).where(eq(images.id, imageRef.imageId)) : null,
      db.delete(imageReferences).where(eq(imageReferences.refId, sauceId)),
      db.delete(sauces).where(eq(sauces.id, sauceId)),
    ].filter(Boolean),
  );

  return NextResponse.json(defaultResponse);
});
