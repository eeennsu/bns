'use client';

import { Badge } from '@shared/shadcn-ui/ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getDetailPath, sortItems } from '@features/bundle/libs/detailBundle';

import { CATEGORY_ORDER } from '@entities/bundle/consts';
import { IBundleDisplay } from '@entities/bundle/types';

interface IProps {
  bundle: IBundleDisplay;
}

const DetailBundle: FC<IProps> = ({ bundle }) => {
  const discountPercentage = Math.round(
    ((bundle.price - bundle.discountedPrice) / bundle.price) * 100,
  );

  return (
    <section className='flex flex-col gap-8 max-lg:mt-5 lg:gap-4'>
      <div className='flex flex-wrap justify-center gap-4'>
        {bundle.images.map((img, idx) => (
          <div key={img.id ?? idx} className='relative aspect-square w-[45%] lg:w-[30%]'>
            <Image
              src={img.url}
              alt={`bundle image ${idx + 1}`}
              fill
              className='object-cover'
              sizes='(min-width: 768px) 25vw, 50vw'
            />
          </div>
        ))}
      </div>

      <div className='px-1 lg:px-2'>
        <h2 className='mb-3 text-xl font-bold text-black/80'>{bundle.name}</h2>

        {bundle.discountedPrice < bundle.price ? (
          <div className='flex flex-wrap items-center gap-3 max-lg:items-end max-lg:justify-end lg:mb-4'>
            <span className='text-base text-gray-400 line-through'>
              {bundle.price.toLocaleString()}원
            </span>
            <span className='text-2xl font-bold text-black'>
              {bundle.discountedPrice.toLocaleString()}원
            </span>

            <Badge variant='secondary' className='bg-black/80 text-sm font-medium text-white'>
              {discountPercentage}% 할인
            </Badge>
          </div>
        ) : (
          <span className='text-xl font-bold text-black/80 lg:mb-4'>
            {bundle.price.toLocaleString()}원
          </span>
        )}
      </div>

      <ul className='divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white text-sm text-gray-700'>
        {CATEGORY_ORDER.flatMap(type =>
          sortItems(bundle.products[type]).map((item, index) => (
            <li
              key={`${type}-${item.id}-${index}`}
              className='flex items-center justify-between p-3'
            >
              <Link
                href={getDetailPath(type, item.id)}
                className='hover:text-black hover:underline'
              >
                {item.name}
              </Link>
              <span className='text-gray-500'>× {item.quantity}</span>
            </li>
          )),
        )}
      </ul>
    </section>
  );
};

export default DetailBundle;
