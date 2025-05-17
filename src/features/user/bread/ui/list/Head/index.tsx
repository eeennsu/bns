import type { FC } from 'react';

const BreadListHead: FC = () => {
  return (
    <>
      <section className='relative h-[270px] bg-[url("/images/bread-list.jpg")] bg-cover bg-center bg-no-repeat'>
        <p className='text-ivory-tertiary absolute bottom-10 left-1/5 mx-auto max-w-6xl text-lg lg:text-3xl'>
          대파 스콘, 깜빠뉴 달인이 만든 <br />
          정통 유럽 빵을 만나보세요.
        </p>
      </section>
      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 py-6 backdrop-blur-sm sm:py-10'>
        <h1 className='text-lg font-bold text-[#8B4513] md:text-3xl'>Bread Store</h1>

        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </div>
    </>
  );
};

export default BreadListHead;
