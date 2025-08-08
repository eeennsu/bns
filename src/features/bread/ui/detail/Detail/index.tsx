import { ProductData } from '@shared/typings/commons';
import Image from 'next/image';
import { FC } from 'react';

import { IBread } from '@entities/bread/types';

import DrawerAnimation from '@components/DrawerAnimation';
import ProductBadge from '@components/ProductBadge';

import Mbti from './Mbti';

interface IProps {
  bread: ProductData<IBread>;
}

const DetailBread: FC<IProps> = async ({ bread }) => {
  return (
    <DrawerAnimation>
      <div className='mx-auto w-full max-w-5xl bg-white p-3 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:p-10'>
        <div className='flex flex-col gap-3 lg:gap-4'>
          <div className='relative aspect-square w-full overflow-hidden rounded-md shadow-md'>
            <Image
              src={bread.image}
              alt={`${bread.name} 상세 이미지`}
              fill
              className='object-cover shadow-xl'
            />
          </div>

          {(bread.isNew || bread.isSignature) && (
            <div className='flex gap-2'>
              {bread.isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
              {bread.isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
            </div>
          )}
        </div>

        <div className='mt-4 flex flex-col justify-between gap-5 lg:mt-0'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl'>
                {bread.name}
              </h2>
              <p className='text-xl font-semibold text-gray-800 max-lg:text-right'>
                {bread.price?.toLocaleString()}원
              </p>
            </div>

            <p className='text-base leading-relaxed whitespace-pre-line text-gray-600'>
              {bread.description}
            </p>
          </div>

          <Mbti mbti={bread.mbti} />
        </div>
      </div>
    </DrawerAnimation>
  );
};

export default DetailBread;
