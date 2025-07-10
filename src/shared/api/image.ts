import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { and, eq, inArray, isNull } from 'drizzle-orm';

import { deleteUploadthingFile } from '@app/api/upload/utapi';

import { IFileImagesWithSortOrder, ImageRef } from '@entities/image/types';

import { IMAGE_ERRORS } from './errorMessage';

interface IDeleteImageParams {
  refTable: ImageRef;
  refId: number;
}

export const deleteImage = async ({ refTable, refId }: IDeleteImageParams) => {
  const imageRefs = await db
    .select()
    .from(imageReferences)
    .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)));

  if (!imageRefs || imageRefs.length === 0) return;

  const imageIds = imageRefs.map(ref => ref.imageId);
  const imageRefIds = imageRefs.map(ref => ref.id);

  const imagesToDelete = await db
    .select({ id: images.id, url: images.url })
    .from(images)
    .where(inArray(images.id, imageIds));

  await Promise.all(
    imagesToDelete.map(image => image?.url && deleteUploadthingFile(image.url)).filter(Boolean),
  );

  await Promise.all([
    db.delete(imageReferences).where(inArray(imageReferences.id, imageRefIds)),
    db.delete(images).where(inArray(images.id, imageIds)),
  ]);
};

interface IUpdateSingleImageRefParams {
  refTable: string;
  refId: number;
  imageId: number;
}

export const updateSingleImageReference = async ({
  imageId,
  refId,
  refTable,
}: IUpdateSingleImageRefParams) => {
  const [existingImageReference] = await db
    .select()
    .from(imageReferences)
    .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)));

  if (existingImageReference && existingImageReference.imageId !== imageId) {
    let existingImage;

    try {
      [existingImage] = await db
        .select({ id: images.id, url: images.url })
        .from(images)
        .where(eq(images.id, existingImageReference.imageId))
        .limit(1);
    } catch (error) {
      console.error(error);
      throw new Error(IMAGE_ERRORS.FAILED_GET_EXISTING_IMAGE);
    }

    if (existingImage?.url) {
      try {
        void deleteUploadthingFile(existingImage.url);
      } catch (error) {
        console.error(error);
      }
    }

    try {
      await Promise.all([
        db.delete(imageReferences).where(eq(imageReferences.id, existingImageReference.id)),
        db.delete(images).where(eq(images.id, existingImageReference.imageId)),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error(IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS);
    }
  }

  // 신규로 들어온 이미지에 refId 세팅
  try {
    await db
      .update(imageReferences)
      .set({ refId })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, refTable),
          isNull(imageReferences.refId),
        ),
      );
  } catch (error) {
    console.error(error);
    throw new Error(IMAGE_ERRORS.FAILED_UPDATE_IMAGE_REF_ID);
  }
};

interface IUpdateMultiImageRefParams {
  refTable: string;
  refId: number;
  imageIdsWithSortOrder: IFileImagesWithSortOrder[];
}

export const updateMultiImageReference = async ({
  refTable,
  refId,
  imageIdsWithSortOrder,
}: IUpdateMultiImageRefParams) => {
  const incomingImageIds = imageIdsWithSortOrder.map(img => img.id);

  let existingImageReferences;

  try {
    existingImageReferences = await db
      .select({
        id: imageReferences.id,
        imageId: imageReferences.imageId,
        sortOrder: imageReferences.sortOrder,
      })
      .from(imageReferences)
      .where(and(eq(imageReferences.refTable, refTable), eq(imageReferences.refId, refId)));
  } catch (error) {
    console.error(error);
    throw new Error(IMAGE_ERRORS.FAILED_GET_EXISTING_IMAGE_REFS);
  }

  const deletedImageRefIds = existingImageReferences.filter(
    imageRef => !incomingImageIds.includes(imageRef.imageId),
  );
  const toInserts = imageIdsWithSortOrder.filter(
    img => !existingImageReferences.some(ref => ref.imageId === img.id),
  );

  const deleteImageRefIds = deletedImageRefIds.map(ref => ref.id);
  const deletedImageIds = deletedImageRefIds.map(ref => ref.imageId);

  let imagesToDelete;

  try {
    imagesToDelete = await db
      .select({ id: images.id, url: images.url })
      .from(images)
      .where(inArray(images.id, deletedImageIds));
  } catch (error) {
    console.error(error);
    throw new Error(IMAGE_ERRORS.FAILED_GET_DELETED_IMAGES);
  }

  if (imagesToDelete.length > 0) {
    try {
      await Promise.all(
        imagesToDelete
          .map(image => {
            if (image?.url) return deleteUploadthingFile(image.url) || null;
          })
          .filter(Boolean),
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await Promise.all([
        db.delete(imageReferences).where(inArray(imageReferences.id, deleteImageRefIds)),
        db.delete(images).where(inArray(images.id, deletedImageIds)),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error(IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS);
    }
  }

  const toUpdateSortOrders = imageIdsWithSortOrder.filter(img => {
    const existing = existingImageReferences.find(ref => ref.imageId === img.id);
    return existing && existing.sortOrder !== img.sortOrder;
  });

  if (toUpdateSortOrders.length > 0) {
    try {
      await Promise.all(
        toUpdateSortOrders.map(({ id, sortOrder }) =>
          db
            .update(imageReferences)
            .set({
              sortOrder,
            })
            .where(and(eq(imageReferences.imageId, id), eq(imageReferences.refTable, refTable))),
        ),
      );
    } catch (error) {
      console.error(error);
      throw new Error(IMAGE_ERRORS.FAILED_UPDATE_SORT_ODER);
    }
  }

  if (toInserts.length > 0) {
    try {
      await Promise.all(
        toInserts.map(img =>
          db
            .update(imageReferences)
            .set({ refId })
            .where(
              and(
                eq(imageReferences.imageId, img.id),
                eq(imageReferences.refTable, refTable),
                isNull(imageReferences.refId),
              ),
            ),
        ),
      );
    } catch (error) {
      console.error(error);
      throw new Error(IMAGE_ERRORS.FAILED_UPDATE_IMAGE_REF_ID);
    }
  }
};
