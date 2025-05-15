import type { FC } from 'react';

const Head: FC = () => {
  return (
    <>
      <section className='relative h-[400px] bg-[url("/images/set-list.jpg")] bg-cover bg-center bg-no-repeat'>
        <p className='text-ivory-tertiary absolute bottom-10 left-1/5 mx-auto max-w-6xl text-lg lg:text-3xl'>
          대파 스콘, 깜빠뉴 달인이 만든 <br />
          세트 구성품을 만나보세요.
        </p>
      </section>
      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 py-10 backdrop-blur-sm'>
        <h1 className='text-lg font-bold text-[#8B4513] md:text-3xl'>Set Products</h1>

        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </div>
    </>
  );
};

export default Head;
