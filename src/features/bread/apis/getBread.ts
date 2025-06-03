import axios from 'axios';

import { IBreadItem } from '@entities/bread/types';

import { filterBreadResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetBread = async (params: IParams): Promise<IBreadItem> => {
  if (!params?.id) throw new Error('id is required');

  const response = await axios.get(`/api/${params.id}`);

  const data = filterBreadResponse(response.data);

  return data;
};

export default apiGetBread;
