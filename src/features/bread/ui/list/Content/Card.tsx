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
      href={MAIN_PATHS.product.bread.detail({ slug: bread?.id })}
      scroll={false}
      className='group flex flex-col gap-4 overflow-hidden'
    >
      <div className='relative aspect-square w-full overflow-hidden'>
        <Image
          src={bread?.image}
          alt={bread?.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />

        <div className='absolute top-4 left-4 flex flex-wrap items-center gap-2'>
          {bread?.isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
          {bread?.isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
        </div>
      </div>

      <h3 className='line-clamp-2 text-lg font-bold tracking-tight text-black md:text-xl'>
        {bread?.name}
      </h3>
    </Link>
  );
};

export default BreadCard;
