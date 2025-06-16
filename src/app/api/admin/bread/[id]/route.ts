import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { setSucResponseData } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

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

  const [foundedBread] = await db.select().from(breads).where(eq(breads.id, breadId)).limit(1);

  if (!foundedBread) {
    return NextResponse.json({ error: BREAD_ERRORS.NOT_FOUND_BREAD }, { status: 400 });
  }

  const [breadImage] = await db
    .select({
      id: images.id,
      url: images.url,
      name: images.name,
    })
    .from(imageReferences)
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(
      and(eq(imageReferences.refTable, IMAGE_REF_VALUES.BREAD), eq(imageReferences.refId, breadId)),
    )
    .limit(1);

  console.log('breadImage', breadImage);

  if (!breadImage) {
    return NextResponse.json({ error: IMAGE_ERRORS.NOT_FOUND }, { status: 400 });
  }

  const response = {
    ...foundedBread,
    imageFiles: breadImage ? [breadImage] : [],
  };

  return NextResponse.json(setSucResponseData(response));
});

// export const PUT = withAuth(async (req: NextRequest, { params }: Params) => {
//   const breadId = +(await params).id;

//   if (!breadId) {
//     return NextResponse.json({ error: BREAD_ERRORS.MISSING_ID }, { status: 400 });
//   }

//   if (isNaN(breadId)) {
//     return NextResponse.json({ error: BREAD_ERRORS.INVALID_ID }, { status: 400 });
//   }

//   const body = await req.json();
//   const imageId = body?.imageId;

//   if (!imageId) {
//     return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
//   }
// });
