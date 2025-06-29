import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { and, eq } from 'drizzle-orm';

import { deleteUploadthingFile } from '@app/api/upload/utapi';

import { ImageRef } from '@entities/image/types';

interface IParams {
  refTable: ImageRef;
  refId: number;
  deleteItem: Promise<unknown>;
}

export const deleteImageWithItem = async ({ refTable, refId, deleteItem }: IParams) => {
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

  await Promise.all(
    [
      db.delete(imageReferences).where(eq(imageReferences.id, imageRef.id)),
      db.delete(images).where(eq(images.id, imageRef.imageId)),
      deleteItem,
    ].filter(Boolean),
  );
};

interface IUpdateImageRefParams {
  refTable: string;
  refId: number;
  newImageId: number;
}

export const updateImageReference = async ({
  refTable,
  refId,
  newImageId,
}: IUpdateImageRefParams) => {
  const [existingImageRef] = await db
    .select({
      id: imageReferences.id,
      imageId: imageReferences.imageId,
    })
    .from(imageReferences)
    .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)))
    .limit(1);

  if (existingImageRef?.imageId !== newImageId) {
    if (existingImageRef) {
      const [existingImage] = await db
        .select({ id: images.id, url: images.url })
        .from(images)
        .where(eq(images.id, existingImageRef.imageId))
        .limit(1);

      if (existingImage?.url) {
        void deleteUploadthingFile(existingImage.url);
      }

      await Promise.all([
        db.delete(imageReferences).where(eq(imageReferences.id, existingImageRef.id)),
        db.delete(images).where(eq(images.id, existingImageRef.imageId)),
      ]);
    }

    // 기존 참조 삭제 후 새 이미지에 refId 할당
    await db.update(imageReferences).set({ refId }).where(eq(imageReferences.imageId, newImageId));
  }
};
