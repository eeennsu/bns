import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { deleteImageWithItem, updateImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { WithImageId } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { BreadFormDto } from '@entities/bread/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: Params) => {
  const breadId = +(await params).id;

  if (!breadId) {
    return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(breadId)) {
    return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [breadResult, imageResult] = await Promise.all([
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

export const PUT = withAuth(async (request: NextRequest, { params }: Params) => {
  const breadId = +(await params).id;

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

  await updateImageReference({
    refTable: IMAGE_REF_VALUES.BREAD,
    refId: breadId,
    newImageId: imageId,
  });

  const { name, description, price, mbti, sortOrder, isHidden, isNew, isSignature } = body;

  const updateBread = await db
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
    .where(eq(breads.id, breadId));

  if (!updateBread) {
    return NextResponse.json({ error: BREAD_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(updateBread));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: Params) => {
  const breadId = +(await params).id;

  if (!breadId) {
    return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(breadId)) {
    return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [foundedBread] = await db.select().from(breads).where(eq(breads.id, breadId)).limit(1);

  if (!foundedBread) {
    return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
  }

  await deleteImageWithItem({
    refTable: IMAGE_REF_VALUES.BREAD,
    refId: breadId,
    deleteItem: db.delete(breads).where(eq(breads.id, breadId)),
  });

  return new NextResponse(null, { status: 204 });
});
