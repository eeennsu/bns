import { uploadFiles } from '@libs/uploadImage';
import { ClientUploadedFileData } from 'uploadthing/types';

import { IImageFile, ImageFileType } from '@typings/commons';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFile: IImageFile }>(
  data: T,
  type: ImageFileType,
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
    imageId = existData?.imageFile?.id;
  } else {
    let uploadResponse: ClientUploadedFileData<{
      imageId: string;
    }>[];

    try {
      uploadResponse = await uploadFiles('imageUploader', {
        files: data.imageFiles,
        input: { ref: type },
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
