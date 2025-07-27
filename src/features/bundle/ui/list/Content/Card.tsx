'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Badge, Card, CardContent } from '@shared/shadcn-ui/ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

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
  const discountPercentage =
    bundle.discountedPrice !== 0
      ? Math.round(((bundle.price - bundle.discountedPrice) / bundle.price) * 100)
      : 0;

  return (
    <Link href={MAIN_PATHS.product.bundle.detail({ slug: bundle.id })} scroll={false}>
      <Card className='rounded-2xl border border-[#e6dccf] bg-transparent p-6 shadow-xs hover:shadow-lg'>
        <div className='relative h-40 w-full overflow-hidden rounded-xl sm:h-48'>
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
          />
          {discountPercentage > 0 && (
            <Badge variant='default' className='absolute top-2 right-2 text-xs sm:text-sm'>
              {discountPercentage}% 할인
            </Badge>
          )}
        </div>

        <CardContent className='px-1 sm:px-2'>
          <h3 className='mb-1 text-base font-bold text-[#4E342E] sm:text-lg'>{bundle.name}</h3>

          <div className='mb-2'>
            {bundle.discountedPrice !== 0 ? (
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-1'>
                <span className='text-wood text-base font-bold sm:text-lg'>
                  {bundle.discountedPrice.toLocaleString()}원
                </span>
                <span className='text-xs text-[#9E9E9E] line-through sm:text-sm'>
                  {bundle.price.toLocaleString()}원
                </span>
              </div>
            ) : (
              <span className='text-base font-bold text-[#6D4C41] sm:text-lg'>
                {bundle.price.toLocaleString()}원
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BundleCard;
