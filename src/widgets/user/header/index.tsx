import { Menu } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { BRAND_TITLE } from '@consts/commons';

import DrawerMenu from './DrawerMenu';
import Menus from './Menus';

const Header: FC = () => {
  return (
    <header className='bg-clip fixed top-0 z-40 w-full border-b opacity-94 shadow-md backdrop-blur-xl backdrop-filter transition-all duration-300'>
      <div className='bg-g flex w-full items-center justify-between px-7 py-6'>
        <Link
          href={USER_PATHS.home()}
          className='font-baloo-2 text-wood-secondary flex items-center gap-2 text-xl font-bold'
        >
          <h1>{BRAND_TITLE.EN}</h1>
        </Link>
        <DrawerMenu>
          <Menu className='cursor-pointer' />
        </DrawerMenu>

        <Menus />
      </div>
    </header>
  );
};

export default Header;
