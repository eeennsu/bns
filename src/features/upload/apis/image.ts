import axios from 'axios';

import { IUploadImage } from '@entities/image/types';

import { filterImagesResponse } from '../libs/filterResponse';

interface IParams extends IUploadImage {}

const apiUploadImage = async (data: IParams): Promise<number[]> => {
  const response = await axios.post<IUploadImage>('/api/admin/image', {
    imageFiles: data.imageFiles,
    refType: data.refType,
  });

  return filterImagesResponse(response.data);
};

export default apiUploadImage;
