import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';
import { BlurFade } from 'src/shared/magic-ui/blur-fade';
import { BoxReveal } from 'src/shared/magic-ui/box-reveal';

import { HERO_ANIM_DURATIONS, HERO_TITLE_DURATIONS } from '@consts/brand';

import LinkButton from '@components/LinkButton';

const DUMMY_IMAGES = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/200/300?grayscale',
  'https://picsum.photos/id/234/200/300',
];

const Hero: FC = () => {
  return (
    <section className='flex w-full flex-row items-center justify-between gap-4 pt-5 xl:pt-0'>
      <div className='flex flex-col justify-center gap-4 xl:w-[40dvw]'>
        <h1 className='text-wood font-gowun-dodum text-4xl font-bold tracking-tighter lg:text-5xl'>
          정성으로 구워낸 수제 빵
        </h1>

        <BoxReveal boxColor='' duration={HERO_TITLE_DURATIONS.DESCRIPTION}>
          <p className='text-wood/80 lg:text-lg'>
            유기농 재료와 전통적인 방식으로 만들어진 우리의 수제 빵을 만나보세요. 정성과 사랑이 가득
            담겨 있습니다.
          </p>
        </BoxReveal>

        <div className='flex justify-center gap-4 pt-4 sm:flex-row lg:justify-start'>
          <LinkButton href={USER_PATHS.bread.list()} size='lg'>
            어떤 빵이 있나요? <ArrowRight />
          </LinkButton>
        </div>
      </div>
      <div className='p-2-xl hidden h-[68dvh] flex-grow gap-2 rounded-lg bg-white shadow-2xl xl:flex'>
        <figure className='relative w-[70%] overflow-hidden rounded-l-lg'>
          <Image
            src='https://picsum.photos/seed/picsum/580/580'
            alt='Artisan bread'
            fill
            className='rounded-l-lg object-cover transition-transform duration-500 ease-in-out hover:scale-105'
          />
        </figure>

        <figure className='flex flex-grow flex-col gap-2 overflow-hidden rounded-r-lg'>
          {DUMMY_IMAGES.map((src, index) => (
            <BlurFade
              key={index}
              className='relative h-1/3'
              delay={index * 0.3 + HERO_ANIM_DURATIONS.IMAGE}
            >
              <Image
                src={src}
                alt='Artisan bread'
                fill
                className='rounded-tr-lg object-cover transition-transform duration-500 ease-in-out hover:scale-105'
              />
            </BlurFade>
          ))}
        </figure>
      </div>
    </section>
  );
};

export default Hero;
