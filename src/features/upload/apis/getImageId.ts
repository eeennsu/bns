import { uploadFiles } from '@libs/uploadImage';
import { ClientUploadedFileData } from 'uploadthing/types';

import { IImageFile } from '@typings/commons';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFile: IImageFile }>(
  data: T,
  existData?: D,
) => {
  let imageId: string | undefined = undefined;

  const newFile = data?.imageFiles?.[0];
  const isSameFile =
    newFile &&
    existData?.imageFile &&
    newFile.name === existData.imageFile.name &&
    newFile.size === existData.imageFile.size;

  if (isSameFile) {
    imageId = existData?.imageFile?.url;
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
