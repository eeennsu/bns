import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { Badge } from '@shadcn-ui/ui/badge';
import { Card, CardContent } from '@shadcn-ui/ui/card';

export interface BakerySetItem {
  id: string;
  name: string;
  quantity: number;
}

export interface IProps {
  bundle: any;
}

const BundleCard: FC<IProps> = ({ bundle }) => {
  const discountPercentage = Math.round(
    ((bundle.price - bundle.discountedPrice) / bundle.price) * 100,
  );

  return (
    <Card className='rounded-2xl border border-[#e6dccf] bg-transparent p-6 shadow-xs hover:shadow-lg'>
      <div className='relative h-40 w-full overflow-hidden rounded-xl sm:h-48'>
        <Image
          src={bundle.imageUrl}
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
          {bundle.discountedPrice < bundle.price ? (
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

        <ul className='mt-3 rounded-lg text-sm text-[#5D4037]'>
          {bundle.items.map((item, index) => (
            <li
              key={index}
              className='flex items-center gap-2 border-b border-[#e8e2d8] py-1.5 last:border-none sm:py-2'
            >
              <span>
                <Link
                  href={
                    item?.bread_id
                      ? MAIN_PATHS.product.bread.detail({ slug: item.name })
                      : MAIN_PATHS.product.sauce.detail({ slug: item.name })
                  }
                >
                  {item.name}
                </Link>
                <span className='text-[#9E9E9E]'>× {item.quantity}</span>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BundleCard;
