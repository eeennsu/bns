'use client';

import { Badge } from '@shared/shadcn-ui/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/shadcn-ui/ui/tabs';
import { cn } from '@shared/shadcn-ui/utils';
import { Tag } from 'lucide-react';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';

import { IBundleDisplay, IBundleProductDisplay } from '@entities/bundle/types';

interface IProps {
  bundle: IBundleDisplay;
}

function percentOff(price: number, discounted: number) {
  if (price <= 0 || discounted >= price) return 0;
  return Math.round(((price - discounted) / price) * 100);
}

const DetailBundle: FC<IProps> = ({ bundle }) => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const categories = useMemo(
    () =>
      [
        { key: 'breads', label: '빵', items: bundle.products.breads },
        { key: 'sauces', label: '소스', items: bundle.products.sauces },
        { key: 'dishes', label: '디쉬', items: bundle.products.dishes },
        { key: 'drinks', label: '음료', items: bundle.products.drinks },
        { key: 'desserts', label: '디저트', items: bundle.products.desserts },
      ] as {
        key: keyof IBundleDisplay['products'];
        label: string;
        items: IBundleProductDisplay[];
      }[],
    [bundle.products],
  ).filter(c => c.items.length > 0);

  const hasDiscount = bundle.discountedPrice > 0 && bundle.discountedPrice < bundle.price;
  const off = useMemo(() => percentOff(bundle.price, bundle.discountedPrice), [bundle]);
  const displayPrice = hasDiscount ? bundle.discountedPrice : bundle.price;

  return (
    <section className='flex flex-col gap-3 p-2'>
      <div>
        <h2 className='text-xl font-semibold text-gray-900'>{bundle.name}</h2>
        <p className='mt-1 text-sm text-gray-600'>{bundle.description}</p>
      </div>

      <div className='flex flex-col gap-3 lg:flex-row lg:gap-6'>
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

        <div className='flex grow flex-col gap-3 rounded-md bg-white px-2 shadow-sm'>
          <div className='flex items-center gap-1.5'>
            <h3 className='text-xl font-semibold text-gray-900 lg:text-lg'>
              {displayPrice.toLocaleString()}원
            </h3>
            {hasDiscount && (
              <Badge
                variant='secondary'
                className='bg-gray-900 px-1.5 py-0.5 text-[11px] text-white'
              >
                <Tag className='mr-0.5 size-3' />
                {'-' + off + '%'}
              </Badge>
            )}
          </div>

          <p className='text-xs text-gray-500'>
            세트 구성에 포함된 항목을 카테고리별로 확인하세요.
          </p>

          <Tabs defaultValue={categories.find(c => c.items.length > 0)?.key ?? 'breads'}>
            <TabsList className='flex h-fit flex-wrap gap-1 rounded-md bg-gray-100 p-1'>
              {categories.map(c => (
                <TabsTrigger
                  key={c.key}
                  value={c.key}
                  className='cursor-pointer px-1.5 py-0.5 text-[10px] font-medium'
                >
                  {c.label}
                  <span className='ml-0.5 text-gray-500'>({c.items.length})</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(c => (
              <TabsContent key={c.key} value={c.key} className='mt-3'>
                {c.items.length === 0 ? (
                  <div className='text-sm text-gray-400'>해당 카테고리의 구성품이 없습니다.</div>
                ) : (
                  <ul className='divide-y divide-gray-200'>
                    {c.items.map(item => (
                      <li
                        key={item.id}
                        className='flex items-center justify-between py-2 first-of-type:pt-0 lg:last-of-type:pb-0'
                      >
                        <div className='truncate text-sm font-medium text-gray-900'>
                          {item.name}
                        </div>
                        <span className='rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700'>
                          {'x' + (item.quantity ?? 1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DetailBundle;
