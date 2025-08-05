'use client';

import useScrollPosition from '@shared/hooks/useScrollPosition';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import DrawerMenu from './DrawerMenu';
import MainTitle from './MainTitle';
import Menus from './Menus';

const Header: FC = () => {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition({ disabled: pathname === '/', threshold: 10 });
  const { activeIndex } = useFullPageScrollStore();

  return (
    <header
      className={cn(
        'fixed top-0 z-10 w-full transition-colors duration-300',
        pathname === '/'
          ? 'bg-transparent'
          : isScrolled
            ? 'bg-black/80 backdrop-blur-sm'
            : 'bg-white',
      )}
    >
      <div className='bg-g flex w-full items-center justify-between px-20 py-9'>
        <Link href={MAIN_PATHS.home()} className='flex items-center gap-2 text-xl font-bold'>
          <MainTitle
            className={cn(pathname !== '/' ? (isScrolled ? 'text-white' : 'text-black/80') : '')}
          />
        </Link>
        <DrawerMenu triggerClassName='block lg:hidden'>
          <Menu
            className={cn(
              'cursor-pointer',
              pathname !== '/'
                ? isScrolled
                  ? 'text-white'
                  : 'text-black/80'
                : activeIndex === 0
                  ? 'text-white'
                  : 'text-black/80',
            )}
          />
        </DrawerMenu>

        <Menus isScrolled={isScrolled} />
      </div>
    </header>
  );
};

export default Header;
