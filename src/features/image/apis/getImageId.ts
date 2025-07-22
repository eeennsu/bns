import { IImageFile, ImageRef } from '@entities/image/types';

import { uploadImageAndRegister } from '../libs/uploadImageAndRegister';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFiles: IImageFile[] }>(
  data: T,
  type: ImageRef,
  existData?: D,
) => {
  let imageId: number | undefined = undefined;

  const newFile = data?.imageFiles?.[0];
  const existFile = existData?.imageFiles?.[0];

  const isSameFile =
    newFile.id === existFile.id &&
    newFile?.name === existFile?.name &&
    newFile?.url === existFile?.url;

  if (isSameFile) {
    imageId = existFile.id;
  } else {
    imageId = await uploadImageAndRegister([{ file: newFile }], type).then(imageIds =>
      imageIds.at(0),
    );

    if (!imageId) {
      return null;
    }
  }

  return imageId;
};

export default getImageId;
