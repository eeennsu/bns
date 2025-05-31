import type { FC } from 'react';
import { TypingAnimation } from 'src/shared/magic-ui/typing-animation';

import UtilLocalImage  from '@utils/utilImage';

import StoryLink from './StoryLink';

const Slogan: FC = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className='font-gowun-dodum flex h-full flex-col items-center justify-center gap-6 px-4 text-center'>
        <div
          className={`relative flex h-[calc(100dvh-15rem)] min-w-[100vw] flex-col items-center justify-center gap-4 bg-cover bg-fixed 2xl:h-[calc(100dvh-17rem)] 2xl:gap-6`}
          style={{
            backgroundImage: `url(${UtilLocalImage.IMAGES.ABOUT.BG})`,
          }}
        >
          <div className='absolute inset-0 z-0 bg-black/60' />
          <div className='z-10 h-[3.5rem] md:h-[4.3rem]'>
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
          </div>

          <StoryLink />
        </div>
      </div>
    </section>
  );
};

export default Slogan;
