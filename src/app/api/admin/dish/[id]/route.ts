import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences, images } from '@db/schemas/image';
import { defaultResponse, setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { DISH_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: Params) => {
  const dishId = +(await params).id;

  if (!dishId) {
    return NextResponse.json({ error: DISH_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dishId)) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [dishResult, imageResult] = await Promise.all([
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
        and(eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH), eq(imageReferences.refId, dishId)),
      )
      .limit(1),
  ]);

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

export const PUT = withAuth(async (req: NextRequest, { params }: Params) => {
  const dishId = +(await params).id;

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

  const [existingImageRef] = await db
    .select({
      id: imageReferences.id,
      imageId: imageReferences.imageId,
    })
    .from(imageReferences)
    .where(
      and(eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH), eq(imageReferences.refId, dishId)),
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
      .set({ refId: dishId })
      .where(eq(imageReferences.imageId, imageId));
  }

  const { name, description, price, ingredients, sortOrder, isHidden, isNew, isSignature } = body;

  const updateDish = await db
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
    .where(eq(dishes.id, dishId));

  if (!updateDish) {
    return NextResponse.json({ error: DISH_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(updateDish));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: Params) => {
  const dishId = +(await params).id;

  if (!dishId) {
    return NextResponse.json({ error: DISH_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(dishId)) {
    return NextResponse.json({ error: DISH_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [foundedDish] = await db.select().from(dishes).where(eq(dishes.id, dishId)).limit(1);

  if (!foundedDish) {
    return NextResponse.json({ error: DISH_ERRORS.NOT_FOUND_DISH }, { status: 400 });
  }

  const [imageRef] = await db
    .select()
    .from(imageReferences)
    .where(eq(imageReferences.refId, dishId));

  await Promise.all(
    [
      imageRef?.id ? db.delete(images).where(eq(images.id, imageRef.imageId)) : null,
      db.delete(imageReferences).where(eq(imageReferences.refId, dishId)),
      db.delete(dishes).where(eq(dishes.id, dishId)),
    ].filter(Boolean),
  );

  return NextResponse.json(defaultResponse);
});
