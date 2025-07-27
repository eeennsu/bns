import type { FC } from 'react';

import UtilLocalImage from '@utils/utilImage';

const BundleListHead: FC = () => {
  return (
    <>
      <section
        className='relative mx-auto h-[400px] max-w-6xl rounded-b-[2rem] bg-cover bg-center bg-no-repeat shadow-md'
        style={{
          backgroundImage: `url(${UtilLocalImage.IMAGES.BUNDLE.LIST})`,
        }}
      >
        <p className='absolute bottom-10 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4 text-center text-xl font-semibold text-white drop-shadow-md md:text-4xl'>
          대파 스콘, 깜빠뉴 달인이 만든 <br />
          세트 구성품을 만나보세요.
        </p>
      </section>

      <section className='mx-auto flex max-w-6xl flex-col items-center py-7 text-center sm:px-4 sm:py-10'>
        <h1 className='text-4xl font-extrabold text-[#5D4037]'>Set Products</h1>
        <div className='mt-3 h-1 w-24 rounded bg-[#A47551]' />
      </section>
    </>
  );
};

export default BundleListHead;
