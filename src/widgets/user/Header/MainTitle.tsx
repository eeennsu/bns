import { WordRotate } from '@shared/magic-ui';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import type { FC } from 'react';

interface IProps {
  className?: string;
}

const MainTitle: FC<IProps> = ({ className }) => {
  const { activeIndex } = useFullPageScrollStore();

  return (
    <h1
      className={cn(
        'font-playwrite flex items-center gap-1 text-3xl font-bold text-white',
        className,
      )}
    >
      Bread &
      {activeIndex === 0 ? (
        <WordRotate
          duration={3000}
          isActive={activeIndex === 0}
          words={['Sauce', 'Coffee', 'Salad', 'Dish', 'Dessert']}
        />
      ) : (
        'Sauce'
      )}
    </h1>
  );
};

export default MainTitle;
