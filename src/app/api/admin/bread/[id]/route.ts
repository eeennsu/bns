import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { setSucResponseData } from 'src/shared/api/response';
import { withAuth } from 'src/shared/api/withAuth';

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

  const [foundedBread] = await db.select().from(breads).where(eq(breads.id, breadId)).limit(1);

  if (!foundedBread) {
    return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
  }

  const [breadImage] = await db
    .select({
      id: images.id,
      url: images.url,
      order: imageReferences.order,
    })
    .from(imageReferences)
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(and(eq(imageReferences.refTable, 'breads'), eq(imageReferences.refId, breadId)))
    .limit(1);

  if (!breadImage) {
    return NextResponse.json({ error: IMAGE_ERRORS.NOT_FOUND }, { status: 400 });
  }

  const response = {
    ...foundedBread,
    images: breadImage ? [breadImage] : [],
  };

  return NextResponse.json(setSucResponseData(response));
});
