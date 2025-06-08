import { uploadFiles } from '@libs/uploadImage';

import { IFileImagesWithSortOrder, ImageFileType } from '@typings/commons';

const getMultiImageIds = async <T extends { imageFiles?: any }, D extends { imageFiles: any[] }>(
  data: T,
  type: ImageFileType,
  existingData?: D,
): Promise<IFileImagesWithSortOrder[]> => {
  const newFiles = (data?.imageFiles ?? []) as any[];
  const existingFiles = existingData?.imageFiles ?? [];

  const existingImages: IFileImagesWithSortOrder[] = [];
  const filesToUpload: { file: File; sortOrder: number }[] = [];

  newFiles.forEach((newFile, index) => {
    const matched = existingFiles.find(
      file => file.name === newFile.name && file.size === newFile.size,
    );

    if (matched) {
      existingImages.push({ id: matched.id, sortOrder: index + 1 });
    } else {
      filesToUpload.push({ file: newFile, sortOrder: index + 1 });
    }
  });

  let newUploadedImageIds: IFileImagesWithSortOrder[] = [];

  if (filesToUpload.length > 0) {
    let uploadResponse: any[];

    try {
      uploadResponse = await uploadFiles('imageUploader', {
        files: filesToUpload.map(f => f.file),
        input: { ref: type },
      } as any);
    } catch (error) {
      console.error('getMultiImageIds: ', error);
      throw error;
    }

    newUploadedImageIds = uploadResponse.map((image, i) => ({
      id: image.serverData.imageId,
      sortOrder: filesToUpload[i].sortOrder,
    }));
  }

  return existingImages.concat(newUploadedImageIds).sort((a, b) => a.sortOrder - b.sortOrder);
};

export default getMultiImageIds;
