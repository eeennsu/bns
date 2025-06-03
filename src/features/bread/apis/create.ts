import axios from 'axios';

import { BreadFormDto } from '@entities/bread/types';

interface IParams extends BreadFormDto {}

const apiCreateBread = async (data: IParams): Promise<void> => {
  await axios.post('/api/', data);
};

export default apiCreateBread;
