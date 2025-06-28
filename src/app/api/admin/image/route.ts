import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { IMAGE_ERRORS } from '@shared/api/errorMessage';
import { setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { NextRequest, NextResponse } from 'next/server';

import { IUploadImage } from '@entities/image/types';

export const POST = withAuth(async (request: NextRequest) => {
  const body = await request.json();
  const imageFiles = body.imageFiles as IUploadImage['imageFiles'];
  const refType = body.refType;

  if (!imageFiles || imageFiles.length === 0) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  let imageId: number | undefined = undefined;

  try {
    const [imageRow] = await db.insert(images).values(imageFiles).returning();

    await db.insert(imageReferences).values({
      imageId: imageRow.id,
      refTable: refType,
    });

    imageId = imageRow.id;
  } catch (err) {
    console.error('Error inserting image:', err);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_SAVE }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem({ imageIds: [imageId] }));
});
