import { MONTSERRAT } from '@shared/consts/font';
import { cn } from '@shared/shadcn-ui/utils';
import { type FC } from 'react';

interface IProps {
  activeIndex: number;
  size: number;
}

const ScrollerNavigation: FC<IProps> = ({ activeIndex, size }) => {
  return (
    <nav className='fixed top-1/2 right-0 flex -translate-y-1/2 justify-center pr-20'>
      <div className='flex flex-col items-center gap-[18px]'>
        <PageNumber page={Math.min(activeIndex + 1, size)} />

        <div className='relative min-h-24 w-1 rounded-sm bg-gray-300'>
          <div
            className='absolute top-0 left-0 max-h-24 w-full rounded-sm bg-slate-700 transition-all duration-700 ease-in-out'
            style={{ height: ((activeIndex + 1) / size) * 100 }}
          />
        </div>

        <PageNumber page={activeIndex + 1} />
      </div>
    </nav>
  );
};

export default ScrollerNavigation;

const PageNumber: FC<{ page: number }> = ({ page }) => {
  return (
    <span
      className={cn(
        'font-gowun-dodum text-base font-semibold tracking-wider text-black',
        MONTSERRAT.className,
      )}
    >
      {page.toString().padStart(2, '0')}
    </span>
  );
};
