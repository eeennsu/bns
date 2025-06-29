import { FC } from 'react';

import UtilLocalImage from '@utils/utilImage';

const SauceListHead: FC = () => {
  return (
    <>
      <section
        className='relative h-[270px] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${UtilLocalImage.IMAGES.SAUCE.LIST})`,
        }}
      >
        <p className='text-ivory-tertiary absolute bottom-10 left-1/5 mx-auto max-w-6xl text-lg lg:text-3xl'>
          아티산 브레드의 빵과 완벽한 조화를 이루는 다양한 소스를 만나보세요. <br /> 모든 소스는
          신선한 재료로 정성껏 만들어집니다.
        </p>
      </section>
      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 py-6 backdrop-blur-sm sm:py-10'>
        <h1 className='text-lg font-bold text-[#8B4513] md:text-3xl'>Sauce Store</h1>

        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </div>
    </>
  );
};

export default SauceListHead;
