'use client';

import { cn } from '@shared/shadcn-ui/utils';
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

  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full',
        pathname === '/' ? 'bg-transparent' : 'bg-slate-700',
      )}
    >
      <div className='bg-g flex w-full items-center justify-between px-20 py-9'>
        <Link href={MAIN_PATHS.home()} className='flex items-center gap-2 text-xl font-bold'>
          <MainTitle />
        </Link>
        <DrawerMenu triggerClassName='block md:hidden'>
          <Menu className='cursor-pointer' />
        </DrawerMenu>

        <Menus />
      </div>
    </header>
  );
};

export default Header;
