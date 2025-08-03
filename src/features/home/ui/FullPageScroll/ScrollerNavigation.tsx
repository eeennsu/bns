import { PageIndex } from '@shared/consts/commons';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { type FC } from 'react';

interface IProps {
  size: number;
}

const ScrollerNavigation: FC<IProps> = ({ size }) => {
  const { activeIndex, setActiveIndex } = useFullPageScrollStore();

  return (
    <nav className='fixed top-1/2 right-0 flex -translate-y-1/2 justify-center pr-20'>
      <div className='flex flex-col items-center gap-[18px]'>
        <PageNumber page={Math.min(activeIndex + 1, size)} onClick={() => setActiveIndex(0)} />

        <div className='relative min-h-24 w-[6px] rounded-sm bg-gray-300'>
          <div
            className='absolute top-0 left-0 max-h-24 w-full rounded-sm bg-slate-700 transition-all duration-700 ease-in-out'
            style={{ height: ((activeIndex + 1) / size) * 100 }}
          />
        </div>

        <PageNumber page={size} onClick={() => setActiveIndex((size - 1) as PageIndex)} />
      </div>
    </nav>
  );
};

export default ScrollerNavigation;

interface IPageNumberProps {
  page: number;
  onClick?: () => void;
}

const PageNumber: FC<IPageNumberProps> = ({ page, onClick }) => {
  return (
    <button
      className='font-montserrat flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/30 p-2 text-base font-semibold tracking-wider text-black hover:bg-gray-100/70'
      onClick={onClick}
    >
      {page.toString().padStart(2, '0')}
    </button>
  );
};
