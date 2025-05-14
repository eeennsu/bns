import type { FC } from 'react';

const Head: FC = () => {
  return (
    <section className='mb-12 flex flex-col bg-[url("/images/sauce-list.jpg")] bg-cover bg-center bg-no-repeat py-20 text-center'>
      <div className='bg-[#fffff0]/40 px-4 py-10 backdrop-blur-sm'>
        <h1 className='text-4xl font-bold text-[#8B4513] md:text-5xl'>Sauces</h1>
        <p className='mx-auto mt-4 max-w-2xl text-[#3E2723]'>
          아티산 브레드의 빵과 완벽한 조화를 이루는 다양한 소스를 만나보세요. <br /> 모든 소스는
          신선한 재료로 정성껏 만들어집니다.
        </p>
        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </div>
    </section>
  );
};

export default Head;
