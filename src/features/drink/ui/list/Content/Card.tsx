import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import ProductBadge from '@components/ProductBadge';

interface Props {
  drink: any;
}

const DrinkCard: FC<Props> = ({ drink }) => {
  return (
    <Link
      className='overflow-hidden rounded-lg transition-shadow sm:bg-[#FFFFF0]/80 sm:shadow-sm sm:hover:shadow-md'
      href={MAIN_PATHS.product.drink.detail({ slug: drink.id })}
      scroll={false}
    >
      <div className='relative'>
        <div className='relative h-40 w-full sm:h-64'>
          <Image src={drink.image} alt={drink.name} fill className='object-cover' />
        </div>
        <div className='absolute top-3 left-3 flex flex-wrap items-center gap-1'>
          {drink.isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
          {drink.isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
        </div>
      </div>

      <div className='p-3 sm:space-y-2 sm:p-5'>
        <h3 className='font-gowun-dodum line-clamp-2 text-center text-base font-bold text-[#8B4513] sm:text-left sm:text-xl'>
          {drink.name}
        </h3>

        <p className='line-clamp-3 hidden text-xs text-[#3E2723] sm:block sm:text-sm'>
          {drink.description}
        </p>
      </div>
    </Link>
  );
};

export default DrinkCard;
