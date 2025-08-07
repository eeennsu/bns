import UtilLocalImage from '@shared/utils/utilImage';
import Image from 'next/image';
import type { FC } from 'react';

const BreadListHead: FC = () => {
  return (
    <section className='flex flex-col-reverse items-center justify-between gap-6 px-4 lg:flex-row lg:gap-20 lg:px-8'>
      <div className='flex max-w-xl flex-col gap-4 text-center lg:gap-6 lg:text-left'>
        <h1 className='text-4xl font-bold text-black lg:text-6xl'>맛 좋은 빵</h1>
        <h2 className='hidden text-2xl font-semibold text-neutral-700 lg:block'>
          다양한 빵을 접해보세요
        </h2>
        <p className='text-base text-neutral-600 lg:text-lg'>
          매일 아침 정성스럽게 구운 다양한 빵들을 경험해보세요. 오직 이곳에서만 맛볼 수 있습니다.
        </p>
      </div>
      <figure className='relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-gray-100 shadow-2xl'>
        <Image
          src={UtilLocalImage.IMAGES.BREAD.LIST}
          alt='bread illustration'
          fill
          className='border-border rounded-2xl border object-cover p-1'
        />
      </figure>
    </section>
  );
};

export default BreadListHead;
