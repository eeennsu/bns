import { ProductData } from '@shared/typings/commons';
import Image from 'next/image';
import { FC } from 'react';

import { ISauce } from '@entities/sauce/types';

interface IProps {
  sauce: ProductData<ISauce>;
}

const DetailSauce: FC<IProps> = ({ sauce }) => {
  return (
    <section className='bg-[#fdfcf8] px-4 py-6 sm:px-6 lg:py-12'>
      <div className='mx-auto max-w-md space-y-6 rounded-xl bg-white p-6 shadow-xl sm:max-w-lg sm:p-8 lg:max-w-xl'>
        {/* 이미지 */}
        <div className='relative h-48 w-full overflow-hidden rounded-lg sm:h-60 md:h-72'>
          <Image src={sauce.image} alt={sauce.name} fill className='object-cover' />
        </div>

        {/* 텍스트 */}
        <div className='text-center'>
          <h1 className='text-xl font-semibold text-[#2F2F2F] sm:text-2xl'>{sauce.name}</h1>
          <p className='mt-2 text-base font-bold text-[#4A4A4A] sm:text-lg'>
            {sauce.price.toLocaleString()}원
          </p>
          <p className='mt-4 text-sm leading-[1.8] whitespace-pre-line text-[#5A5A5A] sm:text-base'>
            {sauce.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailSauce;
