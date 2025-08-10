import { Separator } from '@shared/shadcn-ui/ui';
import { ProductData } from '@shared/typings/commons';
import Image from 'next/image';
import { FC } from 'react';

import { IDessert } from '@entities/dessert/types';

import DrawerAnimation from '@components/DrawerAnimation';
import ProductBadge from '@components/ProductBadge';

interface IProps {
  dessert: ProductData<IDessert>;
}

const DetailDessert: FC<IProps> = async ({ dessert }) => {
  return (
    <DrawerAnimation>
      <div className='mx-auto w-full max-w-5xl items-center bg-white p-3 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:p-5'>
        <div className='flex flex-col gap-3 lg:gap-5'>
          <div className='relative aspect-square w-full overflow-hidden rounded-sm shadow-md'>
            <Image
              src={dessert.image}
              alt={`${dessert.name} 상세 이미지`}
              fill
              className='object-cover shadow-xl'
            />
          </div>

          {(dessert.isNew || dessert.isSignature) && (
            <div className='flex gap-2'>
              {dessert.isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
              {dessert.isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
            </div>
          )}
        </div>

        <div className='mt-4 flex flex-col justify-between gap-5 lg:mt-0'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl'>
                {dessert.name}
              </h2>
              <p className='text-xl font-semibold text-gray-800 max-lg:text-right'>
                {dessert.price?.toLocaleString()}원
              </p>
            </div>

            <Separator />

            <p className='text-base leading-relaxed whitespace-pre-line text-gray-600'>
              {dessert.description}
            </p>
          </div>
        </div>
      </div>
    </DrawerAnimation>
  );
};

export default DetailDessert;
