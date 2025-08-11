import { BRAND_TITLE } from '@shared/consts/brand';
import { WordRotate } from '@shared/magic-ui';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import useFullMainCarousel from '@shared/stores/mainCarousel';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

interface IProps {
  className?: string;
}

const MainTitle: FC<IProps> = ({ className }) => {
  const pathname = usePathname();
  const { activeIndex: fullPageActiveIndex } = useFullPageScrollStore();
  const { activeIndex: mainCarouselActiveIndex } = useFullMainCarousel();

  return (
    <h1
      className={cn(
        'font-playwrite flex items-center gap-[9px] text-lg font-bold transition-colors duration-700 lg:text-3xl',
        fullPageActiveIndex === 0 ? 'text-white' : 'text-black',
        className,
      )}
    >
      {pathname === '/' ? (
        fullPageActiveIndex === 0 ? (
          <>
            Bread &
            <WordRotate
              duration={3000}
              isActive
              words={['Sauce', 'Coffee', 'Salad', 'Pasta', 'Dessert']}
              customIndex={mainCarouselActiveIndex}
            />
          </>
        ) : (
          BRAND_TITLE.EN
        )
      ) : (
        BRAND_TITLE.EN
      )}
    </h1>
  );
};

export default MainTitle;
