import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import { ISignatureProduct } from '@entities/home/types';

interface IProps {
  signature: ISignatureProduct;
}

const SignatureCard: FC<IProps> = ({ signature }) => {
  return (
    <div className='h-full rounded-2xl p-0 transition-all'>
      <div className='flex h-full flex-grow items-center justify-center p-0'>
        <Link
          href={MAIN_PATHS.product[signature.type].detail({ slug: signature.id })}
          // href={MAIN_PATHS.product.bread.detail({ slug: bread.name })}
          className='group relative inline-flex h-full w-full flex-col overflow-hidden rounded-lg'
        >
          <div className='relative aspect-square max-h-[500px] overflow-hidden'>
            <Image
              src={signature?.image}
              alt={signature?.name}
              fill
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </div>
          <div className='rounded-x-lg z-10 flex-1 space-y-2 rounded-b-lg border border-gray-200 p-4'>
            <h3 className='text-wood line-clamp-1 truncate text-base font-semibold sm:text-lg'>
              {signature?.name}
            </h3>
            <p className='line-clamp-3 text-sm font-medium text-black'>{signature?.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignatureCard;
