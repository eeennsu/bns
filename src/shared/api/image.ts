import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { and, eq } from 'drizzle-orm';

import { deleteUploadthingFile } from '@app/api/upload/utapi';

import { ImageRef } from '@entities/image/types';

interface IParams {
  refTable: ImageRef;
  refId: number;
}

export const deleteImageWithItem = async ({ refTable, refId }: IParams) => {
  const [imageRef] = await db
    .select()
    .from(imageReferences)
    .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)))
    .limit(1);

  if (!imageRef) return;

  const [image] = await db
    .select({ id: images.id, url: images.url })
    .from(images)
    .where(eq(images.id, imageRef.imageId))
    .limit(1);

  if (image?.url) {
    void deleteUploadthingFile(image.url);
  }

  await Promise.all([
    db.delete(imageReferences).where(eq(imageReferences.id, imageRef.id)),
    db.delete(images).where(eq(images.id, imageRef.imageId)),
  ]);
};

interface IUpdateImageRefParams {
  refTable: string;
  refId: number;
  imageIds: number[];
}

export const updateImageReference = async ({
  refTable,
  refId,
  imageIds,
}: IUpdateImageRefParams) => {
  const existingImageRefS = await db
    .select({
      id: imageReferences.id,
      imageId: imageReferences.imageId,
    })
    .from(imageReferences)
    .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)));

  const existingImageIds = existingImageRefS.map(imageRef => imageRef.imageId);

  const toDeleteImageIds = existingImageRefS.filter(
    imageRef => !imageIds.includes(imageRef.imageId),
  );
  const toInsertImageIds = imageIds.filter(imageId => !existingImageIds.includes(imageId));

  await Promise.all(
    toDeleteImageIds.map(async ref => {
      const [img] = await db.select().from(images).where(eq(images.id, ref.imageId)).limit(1);
      if (img?.url) {
        void deleteUploadthingFile(img.url);
      }

      await db.delete(imageReferences).where(eq(imageReferences.id, ref.id));
      await db.delete(images).where(eq(images.id, ref.imageId));
    }),
  );

  await Promise.all(
    toInsertImageIds.map(imageId =>
      db.insert(imageReferences).values({
        refTable,
        refId,
        imageId,
      }),
    ),
  );
};
