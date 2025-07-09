import { FileWithDropzone, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/upload';
import { compressImage } from './compress';
import { uploadFiles } from './uploadthing';

export const uploadImageAndRegister = async (
  filesWithSortOrder: {
    file: FileWithDropzone;
    sortOrder?: number;
  }[],
  refType: ImageRef,
) => {
  const filesArray = filesWithSortOrder.map(item => item.file).filter(file => file instanceof File);

  console.log('filesWithSortOrder', filesWithSortOrder);
  console.log('filesArray', filesArray);
  const compressedFiles = await Promise.all(filesArray.map(file => compressImage(file)));

  if (!compressedFiles) {
    return [];
  }

  const uploadedImageResponse = await uploadFiles('imageUploader', {
    files: compressedFiles,
  });

  if (!uploadedImageResponse || uploadedImageResponse.length === 0) {
    return [];
  }

  let imageIds: number[] = [];

  try {
    imageIds = await apiUploadImage({
      imageFiles: uploadedImageResponse.map((image, index) => ({
        url: image.ufsUrl,
        name: image.name,
        sortOrder: filesWithSortOrder[index]?.sortOrder || undefined,
      })),
      refType,
    });

    console.log('imageIds', imageIds);
  } catch (error) {
    console.error('error', error);
    imageIds = [];
  }

  return imageIds;
};
