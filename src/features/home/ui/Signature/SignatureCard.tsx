import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

interface IProps {
  bread: any;
  index: number;
}

const SignatureCard: FC<IProps> = ({ bread, index }) => {
  return (
    <div className='h-full rounded-2xl p-0 transition-all'>
      <div className='flex h-full flex-grow items-center justify-center p-0'>
        <Link
          href={MAIN_PATHS.product.bread.detail({ slug: bread.name })}
          className='group relative inline-flex h-full w-full flex-col overflow-hidden rounded-lg'
        >
          <div className='relative aspect-square max-h-[500px] overflow-hidden'>
            <Image
              src={`https://picsum.photos/id/${index + 24}/500/500`}
              alt={bread.name}
              fill
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </div>
          <div className='rounded-x-lg z-10 flex-1 space-y-2 rounded-b-lg border border-gray-200 p-4'>
            <h3 className='text-wood line-clamp-1 truncate text-base font-semibold sm:text-lg'>
              {bread.name}
            </h3>
            <p className='line-clamp-3 text-sm font-medium text-black'>{bread.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignatureCard;
