import { ProductData } from '@shared/typings/commons';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { IBread } from '@entities/bread/types';

import ProductBadge from '@components/ProductBadge';

interface Props {
  bread: ProductData<IBread>;
}

const BreadCard: FC<Props> = ({ bread }) => {
  return (
    <Link
      href={MAIN_PATHS.product.bread.detail({ slug: bread.id })}
      scroll={false}
      className='group flex flex-col overflow-hidden border-neutral-200 bg-white transition-all hover:border-black hover:shadow-md'
    >
      {/* Image */}
      <div className='relative h-40 w-full sm:h-64'>
        <Image
          src={bread.image}
          alt={bread.name}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
        {/* Badges */}
        <div className='absolute top-3 left-3 flex flex-wrap items-center gap-2'>
          {bread.isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
          {bread.isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-1 p-4 sm:p-5'>
        <h3 className='line-clamp-2 text-center text-base font-semibold text-black sm:text-left sm:text-lg'>
          {bread.name}
        </h3>
        <p>{bread.description}</p>
      </div>
    </Link>
  );
};

export default BreadCard;
