import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

import { IUploadImage } from '@entities/image/types';

import { filterImagesResponse } from '../libs/filterResponse';

interface IParams extends IUploadImage {}

const apiUploadImage = async (data: IParams): Promise<number[]> => {
  const response = await axiosAdmin.post<IUploadImage>('/admin/image', {
    imageFiles: data.imageFiles,
    refType: data.refType,
  });

  return filterImagesResponse(response.data);
};

export default apiUploadImage;
