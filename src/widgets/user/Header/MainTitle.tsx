import { BRAND_TITLE } from '@shared/consts/brand';
import type { FC } from 'react';

const MainTitle: FC = () => {
  return <div className='font-playwrite text-2xl'>{BRAND_TITLE.EN}</div>;
};

export default MainTitle;
