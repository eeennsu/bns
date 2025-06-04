import { uploadFiles } from '@libs/uploadImage';

import { IImageFile, ImageFileInput } from '@typings/commons';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFile: IImageFile }>(
  data: T,
  type: ImageFileInput['ref'],
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
    const response = await uploadFiles('imageUploader', {
      files: data.imageFiles,
      input: { ref: type },
    } as any);

    if (!response) {
      return '';
    }

    imageId = response.at(0).serverData.imageId;
  }

  return imageId;
};

export default getImageId;
