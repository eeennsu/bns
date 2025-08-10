'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Badge } from '@shared/shadcn-ui/ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getDiscountPercent } from '@features/bundle/libs/getDiscountPercent';

interface IProps {
  bundle: {
    id: number;
    name: string;
    price: number;
    discountedPrice: number;
    image: string;
  };
}

const BundleCard: FC<IProps> = ({ bundle }) => {
  const discountPercentage = getDiscountPercent(bundle.discountedPrice, bundle.price);

  return (
    <Link href={MAIN_PATHS.product.bundle.detail({ slug: bundle.id })} scroll={false}>
      <div className='group flex flex-col gap-4 overflow-hidden'>
        <div className='relative aspect-square w-full overflow-hidden'>
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />

          {discountPercentage > 0 && (
            <Badge
              variant='secondary'
              className='bg-primary absolute top-3 right-3 text-base text-white shadow-md lg:text-sm'
            >
              {discountPercentage}% 할인
            </Badge>
          )}
        </div>

        <div>
          <h3 className='line-clamp-2 text-base font-semibold text-gray-900 lg:text-lg'>
            {bundle.name}
          </h3>

          <div className='flex justify-end'>
            {bundle.discountedPrice !== 0 ? (
              <div className='flex flex-col items-end lg:flex-row lg:items-center lg:gap-2'>
                <span className='text-xs text-gray-400 line-through lg:text-sm'>
                  {bundle.price.toLocaleString()}원
                </span>
                <span className='text-sm font-bold text-gray-900 lg:text-lg'>
                  {bundle.discountedPrice.toLocaleString()}원
                </span>
              </div>
            ) : (
              <span className='text-lg font-bold text-gray-900 lg:text-xl'>
                {bundle.price.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
