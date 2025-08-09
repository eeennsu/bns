import type { FC } from 'react';

import UtilLocalImage from '@utils/utilImage';

const Slogan: FC = () => {
  return (
    <section className='relative pt-[108px]'>
      <div
        className='relative h-[calc(100dvh-16rem)] w-full bg-cover bg-fixed bg-center 2xl:h-[calc(100dvh-24rem)]'
        style={{
          backgroundImage: `url(${UtilLocalImage.IMAGES.ABOUT.BG})`,
          backgroundPositionY: '15%',
        }}
      >
        <div className='absolute inset-0 z-0 bg-black/50' />
      </div>
    </section>
  );
};

export default Slogan;
