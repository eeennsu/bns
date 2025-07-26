import { ProductData } from '@shared/typings/commons';
import Image from 'next/image';
import { FC } from 'react';

import { IBread } from '@entities/bread/types';

import DrawerAnimation from '@components/DrawerAnimation';

import Mbti from './Mbti';

interface IProps {
  bread: ProductData<IBread>;
}

const DetailBread: FC<IProps> = async ({ bread }) => {
  return (
    <DrawerAnimation>
      <div className='flex items-center justify-center bg-gradient-to-br px-4 py-6 sm:px-6 md:px-8'>
        <div className='w-full max-w-4xl space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
          <div className='relative h-60 w-full overflow-hidden rounded-lg shadow-2xl sm:h-72 md:h-[400px]'>
            <Image
              src='https://picsum.photos/id/600/400/300'
              alt={bread.name}
              fill
              className='object-cover'
            />
          </div>

          <div className='flex flex-col justify-between gap-4 pt-2'>
            <div className='space-y-2'>
              <h2 className='text-2xl font-bold text-[#8B4513] md:text-3xl'>{bread.name}</h2>

              <div className='flex items-center justify-between gap-3 sm:gap-2'>
                <p className='text-lg font-bold text-[#3E2723] md:text-xl'>
                  {bread.price?.toLocaleString()}원
                </p>
                {(bread?.isNew || bread.isSignature) && (
                  <div className='flex items-center gap-2'>
                    {bread.isNew && (
                      <div className='rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                        NEW
                      </div>
                    )}
                    {bread.isSignature && (
                      <div className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                        SIGNATURE
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-5'>
              <div className='space-y-2'>
                <h3 className='text-base font-bold text-[#8B4513] md:text-lg'>상세 설명</h3>
                <p className='text-sm leading-relaxed whitespace-pre-line text-[#3E2723]'>
                  {bread.description}
                </p>
              </div>

              <Mbti mbti={bread.mbti} />
            </div>
          </div>
        </div>
      </div>
    </DrawerAnimation>
  );
};

export default DetailBread;
