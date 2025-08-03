import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@shared/shadcn-ui/ui';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import useFullMainCarousel from '@shared/stores/mainCarousel';
import UtilLocalImage from '@shared/utils/utilImage';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, type FC } from 'react';

const Section1: FC = () => {
  const { activeIndex: fullPageActiveIndex } = useFullPageScrollStore();
  const { activeIndex: mainCarouselActiveIndex, setActiveIndex: setMainCarouselActiveIndex } =
    useFullMainCarousel();

  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef<any>(Autoplay({ delay: 3000, active: fullPageActiveIndex === 0 }));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUserInteraction = () => {
    if (autoplayRef.current) {
      autoplayRef.current.stop();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        autoplayRef.current.play();
      }, 5000);
    }
  };

  useEffect(() => {
    if (!api) return;

    setMainCarouselActiveIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setMainCarouselActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <section className='relative size-full'>
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[autoplayRef.current]}
        className='w-full'
        setApi={setApi}
      >
        <CarouselContent className='h-dvh'>
          {CAROUSEL_IMAGES.map(image => (
            <CarouselItem key={image.key} className='min-h-full basis-full p-0'>
              <figure className='relative size-full'>
                <Image src={image.src} alt={image.key} className='object-cover' fill />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className='absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 justify-center rounded-full bg-black/60 px-6 py-3'>
        <div className='flex items-center gap-10'>
          <button
            onClick={() => {
              api?.scrollPrev();
              handleUserInteraction();
            }}
            className='cursor-pointer'
          >
            <ArrowLeftToLine className='size-4.5 text-white' />
          </button>
          <p className='flex items-center gap-1'>
            <span className='font-medium text-white'>{mainCarouselActiveIndex + 1}</span>
            <span className='text-white/50'>/ {CAROUSEL_IMAGES.length}</span>
          </p>
          <button
            onClick={() => {
              api?.scrollNext();
              handleUserInteraction();
            }}
            className='cursor-pointer'
          >
            <ArrowRightToLine className='size-4.5 text-white' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section1;

const CAROUSEL_IMAGES = [
  { key: 'bread and sauce', src: UtilLocalImage.IMAGES.HOME.SECTION.BG1 },
  { key: 'coffee', src: UtilLocalImage.IMAGES.HOME.SECTION.BG2 },
  { key: 'salad', src: UtilLocalImage.IMAGES.HOME.SECTION.BG3 },
  { key: 'dish', src: UtilLocalImage.IMAGES.HOME.SECTION.BG4 },
  { key: 'dessert', src: UtilLocalImage.IMAGES.HOME.SECTION.BG5 },
];
