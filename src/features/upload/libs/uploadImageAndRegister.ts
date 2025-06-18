import { uploadFiles } from '@shared/libs/uploadImage';

import { FileWithDropzone, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/image';
import { compressImage } from './compress';

export const uploadImageAndRegister = async (files: FileWithDropzone[], refType: ImageRef) => {
  const filesArray: File[] = files.filter(file => file instanceof File);

  const compressedFiles = await Promise.all(filesArray.map(file => compressImage(file)));

  if (!compressedFiles) {
    return [];
  }

  const [uploadedImageResponse] = await uploadFiles('imageUploader', {
    files: compressedFiles,
  });

  if (!uploadedImageResponse) {
    return [];
  }

  let imageIds: number[] = [];

  try {
    imageIds = await apiUploadImage({
      imageFiles: [
        {
          url: uploadedImageResponse.ufsUrl,
          name: uploadedImageResponse.name,
        },
      ],
      refType,
    });
  } catch (error) {
    console.error('error', error);
    imageIds = [];
  }

  return imageIds;
};
