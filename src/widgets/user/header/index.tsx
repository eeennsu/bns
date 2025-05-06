import { Menu } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { BRAND_TITLE, USER_MENU_LIST } from '@consts/commons';

import DrawerMenu from './DrawerMenu';
import MenuButton from './MenuButton';

const Header: FC = () => {
  return (
    <header className='bg-clip fixed top-0 z-40 w-full border-b opacity-94 shadow-md backdrop-blur-xl backdrop-filter transition-all duration-300'>
      <div className='bg-g flex w-full items-center justify-between px-7 py-6'>
        <Link
          href={USER_PATHS.home()}
          className='font-baloo-2 flex items-center gap-2 text-xl font-bold text-[#8B4513]'
        >
          <h1>{BRAND_TITLE.EN}</h1>
        </Link>
        <DrawerMenu>
          <Menu className='cursor-pointer' />
        </DrawerMenu>

        <nav className='mr-20 hidden gap-8 lg:flex'>
          {USER_MENU_LIST.map(menu => (
            <MenuButton key={menu.title} href={menu.href}>
              {menu.title}
            </MenuButton>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
