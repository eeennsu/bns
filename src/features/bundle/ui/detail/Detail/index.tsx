'use client';

import { Badge } from '@shared/shadcn-ui/ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IBundleDisplay } from '@entities/bundle/types';

interface IProps {
  bundle: IBundleDisplay;
}

const DetailBundle: FC<IProps> = ({ bundle }) => {
  const discountPercentage = Math.round(
    ((bundle.price - bundle.discountedPrice) / bundle.price) * 100,
  );

  const CATEGORY_ORDER: (keyof IBundleDisplay['products'])[] = [
    'breads',
    'sauces',
    'dishes',
    'drinks',
    'desserts',
  ];

  const getDetailPath = (type: keyof IBundleDisplay['products'], id: number) => {
    const pathMapper = {
      breads: '/product/bread/', // 실제 라우팅 경로에 따라 수정 필요
      sauces: '/product/sauce/',
      dishes: '/product/dish/',
      drinks: '/product/drink/',
      desserts: '/product/dessert/',
    } as const;

    return `${pathMapper[type]}${encodeURIComponent(id)}`;
  };

  const sortItems = (items: IBundleDisplay['products'][keyof IBundleDisplay['products']]) =>
    [...items].sort((a, b) => {
      if (a.quantity !== b.quantity) return a.quantity - b.quantity;
      return a.name.localeCompare(b.name, 'ko');
    });

  return (
    <section className='flex flex-col gap-6'>
      {/* 이미지 리스트 */}
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
        {bundle.images.map((img, idx) => (
          <div
            key={img.id ?? idx}
            className='bg-muted relative aspect-square w-full overflow-hidden rounded-xl border shadow-sm'
          >
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

      {/* 이름 + 가격 */}
      <div>
        <h2 className='mb-2 text-xl font-bold text-[#4E342E]'>{bundle.name}</h2>

        {bundle.discountedPrice < bundle.price ? (
          <div className='flex items-center gap-3'>
            <span className='text-wood text-2xl font-bold'>
              {bundle.discountedPrice.toLocaleString()}원
            </span>
            <span className='text-base text-[#9E9E9E] line-through'>
              {bundle.price.toLocaleString()}원
            </span>
            <Badge variant='default' className='text-sm'>
              {discountPercentage}% 할인
            </Badge>
          </div>
        ) : (
          <span className='text-xl font-bold text-[#6D4C41]'>
            {bundle.price.toLocaleString()}원
          </span>
        )}
      </div>

      {/* 구성 목록 */}
      <ul className='mt-3 rounded-lg text-sm text-[#5D4037]'>
        {CATEGORY_ORDER.flatMap(type =>
          sortItems(bundle.products[type]).map((item, index) => (
            <li
              key={`${type}-${item.id}-${index}`}
              className='flex items-center gap-2 border-b border-[#e8e2d8] py-1.5 last:border-none sm:py-2'
            >
              <Link href={getDetailPath(type, item.id)} className='hover:underline'>
                {item.name}
              </Link>
              <span className='text-[#9E9E9E]'>× {item.quantity}</span>
            </li>
          )),
        )}
      </ul>
    </section>
  );
};

export default DetailBundle;
