import UtilLocalImage from '@shared/utils/utilImage';
import Image from 'next/image';
import type { FC } from 'react';

const BreadListHead: FC = () => {
  return (
    <section className='flex flex-col-reverse items-center justify-between gap-6 px-4 lg:flex-row lg:gap-20 lg:px-8'>
      <div className='flex max-w-xl flex-col gap-4 text-center lg:gap-6 lg:text-left'>
        <h1 className='text-4xl font-bold text-black lg:text-6xl'>갓 구운 빵</h1>
        <h2 className='hidden text-2xl font-semibold text-neutral-700 lg:block'>
          오감을 만족시키는 풍미로운 맛
        </h2>
        <p className='text-base text-neutral-600 lg:text-lg'>
          고소한 버터의 향, 바삭하게 부서지는 크러스트, 입안 가득 퍼지는 부드러움. 눈과 입이 모두
          즐거운 저희의 빵 라인업을 지금 확인해 보세요.
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
