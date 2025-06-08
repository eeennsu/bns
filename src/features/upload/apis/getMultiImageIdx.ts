import { uploadFiles } from '@libs/uploadImage';
import { ClientUploadedFileData } from 'uploadthing/types';

import { ImageFileType } from '@typings/commons';

const getMultiImageIds = async <T extends { imageFiles?: any }, D extends { imageFiles: any[] }>(
  data: T,
  type: ImageFileType,
  existingData?: D,
) => {
  const newFiles = (data?.imageFiles ?? []) as any[];
  const existingFiles = existingData?.imageFiles ?? [];

  const resultImageIds: { id: string; sortOrder: number }[] = [];
  const filesToUpload: File[] = [];

  newFiles.map((newFile, index) => {
    const matched = existingFiles.find(
      file => file.name === newFile.name && file.size === newFile.size,
    );

    if (matched) {
      resultImageIds.push({ id: matched.id, sortOrder: index + 1 });
    } else {
      filesToUpload.push(Object.assign(newFile, { sortOrder: index + 1 }));
    }
  });

  let resultImages: { id: string; sortOrder: number }[] = [];

  if (filesToUpload.length > 0) {
    let uploadResponse: ClientUploadedFileData<{
      imageId: string;
    }>[];

    try {
      uploadResponse = await uploadFiles('imageUploader', {
        files: filesToUpload,
        input: { ref: type },
      } as any);
    } catch (error) {
      console.error('getMultiImageIds: ', error);
      throw error;
    }

    resultImages = uploadResponse.map((image, index) => ({
      id: image.serverData.imageId,
      sortOrder: resultImageIds[index]?.sortOrder,
    }));
  }

  return existingFiles.concat(resultImages).sort((a, b) => a.sortOrder - b.sortOrder);
};

export default getMultiImageIds;
