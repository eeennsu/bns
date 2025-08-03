import { Carousel, CarouselContent, CarouselItem } from '@shared/shadcn-ui/ui';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import UtilLocalImage from '@shared/utils/utilImage';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import type { FC } from 'react';

const Section1: FC = () => {
  const { activeIndex } = useFullPageScrollStore();

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          active: activeIndex === 0,
        }),
      ]}
      className='w-full'
    >
      <CarouselContent className='h-dvh bg-black'>
        {CAROUSEL_IMAGES.map(image => (
          <CarouselItem key={image.key} className='min-h-full basis-full p-0'>
            <figure className='relative size-full'>
              <Image src={image.src} alt={image.key} className='object-cover' fill />
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Section1;

const CAROUSEL_IMAGES = [
  {
    key: 'bread and sauce',
    src: UtilLocalImage.IMAGES.HOME.SECTION.BG1,
  },
  {
    key: 'coffee',
    src: UtilLocalImage.IMAGES.HOME.SECTION.BG2,
  },
  {
    key: 'salad',
    src: UtilLocalImage.IMAGES.HOME.SECTION.BG3,
  },
  {
    key: 'dish',
    src: UtilLocalImage.IMAGES.HOME.SECTION.BG4,
  },
  {
    key: 'dessert',
    src: UtilLocalImage.IMAGES.HOME.SECTION.BG5,
  },
];
