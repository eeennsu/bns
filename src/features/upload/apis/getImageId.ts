import { uploadFiles } from '@libs/uploadImage';
import { ClientUploadedFileData } from 'uploadthing/types';

import { IImageFile } from '@typings/commons';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFiles: IImageFile[] }>(
  data: T,
  existData?: D,
) => {
  let imageId: string | undefined = undefined;

  const newFile = data?.imageFiles?.[0];
  const existFile = existData?.imageFiles?.[0];

  const isSameFile =
    newFile?.name === existFile?.name &&
    newFile?.type === existFile?.type &&
    newFile?.size === existFile?.size;

  if (isSameFile) {
    imageId = existFile.id;
  } else {
    let uploadResponse: ClientUploadedFileData<{
      imageId: string;
    }>[];

    try {
      uploadResponse = await uploadFiles('imageUploader', {
        files: data.imageFiles,
      } as any);
    } catch (error) {
      console.error('getImageId: ', error);
      throw error;
    }

    imageId = uploadResponse.at(0).serverData.imageId;
  }

  return imageId;
};

export default getImageId;
