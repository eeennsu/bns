import { IImageFile } from '@entities/image/types';

const getImageId = async <T extends { imageFiles?: any }, D extends { imageFiles: IImageFile[] }>(
  data: T,
  existData?: D,
) => {
  let imageId: number | undefined = undefined;

  const newFile = data?.imageFiles?.[0];
  const existFile = existData?.imageFiles?.[0];

  const isSameFile =
    newFile?.name === existFile?.name &&
    newFile?.type === existFile?.type &&
    newFile?.size === existFile?.size;

  if (isSameFile) {
    imageId = existFile.id;
  } else {
    // let uploadResponse: ClientUploadedFileData<{
    //   imageId: number;
    // }>[];
    // try {
    //   uploadResponse = await uploadFiles('imageUploader', {
    //     files: data.imageFiles,
    //   } as any);
    // } catch (error) {
    //   console.error('getImageId: ', error);
    //   throw error;
    // }
  }

  return imageId;
};

export default getImageId;
