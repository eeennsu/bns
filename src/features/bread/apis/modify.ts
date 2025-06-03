import axios from 'axios';

import { BreadFormDto } from '@entities/bread/types';

interface IParams {
  id: number;
  data: BreadFormDto;
}

const apiModifyBread = async ({ id, data }: IParams): Promise<void> => {
  if (!id) throw new Error('id is required');
  await axios.put('/api/', data);
};

export default apiModifyBread;
