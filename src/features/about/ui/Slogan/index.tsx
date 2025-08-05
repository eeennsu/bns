import type { FC } from 'react';

import UtilLocalImage from '@utils/utilImage';

const Slogan: FC = () => {
  return (
    <section className='relative pt-28'>
      <div
        className='relative h-[calc(100dvh-16rem)] w-full bg-cover bg-fixed bg-center 2xl:h-[calc(100dvh-26rem)]'
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

{
  /* <div className='z-10 h-[3.5rem] md:h-[4.3rem]'>
            <TypingAnimation className='text-ivory text-2xl font-semibold tracking-tight md:text-5xl 2xl:text-6xl'>
              빵을 잘 하는
            </TypingAnimation>
          </div>
          <div className='z-10 h-[3.5rem] md:h-[4.3rem]'>
            <TypingAnimation
              className='text-ivory text-2xl font-semibold tracking-tight md:text-5xl 2xl:text-6xl'
              delay={1200}
            >
              소스를 잘 하는
            </TypingAnimation>
          </div>
          <div className='z-10 h-[3.5rem] md:h-[4.3rem]'>
            <TypingAnimation
              className='text-2xl font-semibold tracking-tight text-[#a47148] md:text-5xl 2xl:text-6xl'
              delay={2400}
            >
              그런 빵집
            </TypingAnimation>
          </div> */
}
