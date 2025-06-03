import { uploadFiles } from '@libs/uploadImage';

import { IImageFile, ImageFileInput } from '@typings/commons';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFile: IImageFile }>(
  data: T,
  type: ImageFileInput['ref'],
  existData?: D,
) => {
  let imageId: string | undefined = undefined;

  // 새 데이터의 이미지가 기존 데이터의 이미지와 다름 ==> 신규 업로드 필요
  if (data.imageFiles?.at(0)?.preview !== existData.imageFile.url) {
    const response = await uploadFiles('imageUploader', {
      files: data.imageFiles,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      input: { ref: type },
    });

    if (!response) {
      return '';
    }

    imageId = response.at(0).serverData.imageId;
  } else {
    imageId = existData.imageFile.imageId;
  }

  return imageId;
};

export default getImageId;
