import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { IMAGE_ERRORS } from '@shared/api/errorMessage';
import { setSucResponseItem } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { NextRequest, NextResponse } from 'next/server';

import { IUploadImage } from '@entities/image/types';

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as IUploadImage;
  const imageFiles = body.imageFiles;
  const refType = body.refType;

  if (!imageFiles || imageFiles.length === 0) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  let imageIds: number[];

  try {
    const imageRows = await db
      .insert(images)
      .values(imageFiles.map(image => ({ name: image.name, url: image.url })))
      .returning();
    const imagesWithOrder = imageRows.map((row, i) => {
      const base = {
        imageId: row.id,
        refTable: refType,
      };

      const sortOrder = imageFiles.at(i)?.sortOrder;
      return sortOrder !== undefined ? { ...base, sortOrder } : base;
    });

    await db.insert(imageReferences).values(imagesWithOrder);

    imageIds = imageRows.map(row => row.id);
  } catch (error) {
    console.error('Error inserting image:', error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_SAVE }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem({ imageIds }), { status: 201 });
});
