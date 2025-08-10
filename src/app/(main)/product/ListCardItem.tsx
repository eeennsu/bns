import { cn } from '@shared/shadcn-ui/utils';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { FC } from 'react';

import ProductBadge from '@components/ProductBadge';

interface Props extends LinkProps {
  image: string;
  name: string;
  isNew: boolean;
  isSignature: boolean;
  className?: string;
}

const ListCardItem: FC<Props> = ({ className, image, name, isNew, isSignature, ...linkProps }) => {
  return (
    <Link scroll={false} {...linkProps}>
      <div className={cn('group flex flex-col gap-4 overflow-hidden', className)}>
        <div className='relative aspect-square w-full overflow-hidden'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />

          <div className='absolute top-4 left-4 flex flex-wrap items-center gap-2'>
            {isNew && <ProductBadge variant='new'>NEW</ProductBadge>}
            {isSignature && <ProductBadge variant='signature'>Signature</ProductBadge>}
          </div>
        </div>

        <h3 className='line-clamp-2 px-1 text-lg font-bold tracking-tight text-black md:text-xl'>
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default ListCardItem;
