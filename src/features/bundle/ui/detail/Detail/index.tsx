'use client';

import { Badge } from '@shared/shadcn-ui/ui';
import { cn } from '@shared/shadcn-ui/utils';
import { Tag } from 'lucide-react';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';

import { IBundleDisplay } from '@entities/bundle/types';

import BundleProducts from './BundleProducts';

interface IProps {
  bundle: IBundleDisplay;
}

function percentOff(price: number, discounted: number) {
  if (price <= 0 || discounted >= price) return 0;
  return Math.round(((price - discounted) / price) * 100);
}

const DetailBundle: FC<IProps> = ({ bundle }) => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const hasDiscount = bundle.discountedPrice > 0 && bundle.discountedPrice < bundle.price;
  const off = useMemo(() => percentOff(bundle.price, bundle.discountedPrice), [bundle]);
  const displayPrice = hasDiscount ? bundle.discountedPrice : bundle.price;

  return (
    <section className='flex flex-col gap-3 p-1 lg:flex-row lg:gap-6 lg:p-2'>
      <div className='flex grow flex-col gap-3'>
        <figure className='relative aspect-square overflow-hidden rounded-md shadow-sm lg:min-w-[200px]'>
          <Image
            src={bundle.images[mainImageIndex]?.url}
            alt='bundle image'
            fill
            className='object-cover'
            sizes='(min-width: 768px) 25vw, 50vw'
          />
        </figure>

        {bundle.images.length > 1 && (
          <div className='flex flex-wrap gap-2'>
            {bundle.images.map((img, index) => (
              <figure
                key={index}
                className={cn(
                  'relative aspect-square w-full max-w-[60px] cursor-pointer overflow-hidden rounded-md transition-all hover:opacity-80',
                  index === mainImageIndex && 'ring-2 ring-black',
                )}
                onClick={() => setMainImageIndex(index)}
              >
                <Image src={img.url} alt='bundle image' fill className='object-cover' />
              </figure>
            ))}
          </div>
        )}
      </div>
      <div className='flex grow flex-col gap-4 bg-white lg:p-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl font-bold text-gray-900 lg:text-3xl'>{bundle.name}</h2>
          <p className='text-xs text-gray-600 lg:text-sm'>{bundle.description}</p>
        </div>

        <div className='flex flex-col gap-3 lg:gap-6'>
          <div className='flex items-center gap-1 lg:gap-2'>
            <h3 className='text-xl font-semibold text-gray-900 lg:text-2xl'>
              {displayPrice.toLocaleString()}원
            </h3>
            {hasDiscount && (
              <Badge
                variant='secondary'
                className='flex items-center gap-1 rounded-full bg-gray-900 px-2 py-0.5 text-xs font-medium text-white shadow-sm'
              >
                <Tag className='size-3' />
                {`-${off}%`}
              </Badge>
            )}
          </div>
          <BundleProducts products={bundle?.products} />
        </div>
      </div>
    </section>
  );
};

export default DetailBundle;
