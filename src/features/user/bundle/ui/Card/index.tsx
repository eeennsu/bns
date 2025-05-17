import Image from 'next/image';
import { FC } from 'react';

import { Badge } from '@shadcn-ui/ui/badge';
import { Card, CardContent } from '@shadcn-ui/ui/card';

export interface BakerySetItem {
  id: string;
  name: string;
  quantity: number;
}

export interface IProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discountedPrice: number;
  items: BakerySetItem[];
}

const BundleCard: FC<IProps> = ({ name, imageUrl, price, discountedPrice, items }) => {
  const discountPercentage = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <Card className='overflow-hidden border-[#e8e0d0] bg-[#faf7f2] transition-all hover:shadow-md'>
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className='object-cover transition-transform duration-300 hover:scale-105'
        />
        {discountPercentage > 0 && (
          <Badge className='absolute top-2 right-2 bg-[#d4a373] hover:bg-[#c49a6c]'>
            {discountPercentage}% 할인
          </Badge>
        )}
      </div>
      <CardContent className='p-4'>
        <h3 className='mb-2 text-xl font-semibold text-[#5e503f]'>{name}</h3>
        <div className='mb-3 flex items-center gap-2'>
          {discountedPrice < price ? (
            <>
              <span className='text-lg font-bold text-[#a87c50]'>
                {discountedPrice.toLocaleString()}원
              </span>
              <span className='text-muted-foreground text-sm line-through'>
                {price.toLocaleString()}원
              </span>
            </>
          ) : (
            <span className='text-lg font-bold text-[#a87c50]'>{price.toLocaleString()}원</span>
          )}
        </div>
        <div className='space-y-1'>
          <p className='text-sm font-medium text-[#5e503f]'>구성품:</p>
          <ul className='ml-2 space-y-1'>
            {items.map(item => (
              <li key={item.id} className='flex items-center text-sm text-[#6c6055]'>
                <span className='mr-1 text-[#a87c50]'>•</span>
                {item.name} {item.quantity > 1 && `(${item.quantity}개)`}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleCard;
