import { Menu } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { BRAND_TITLE, USER_MENU_LIST } from '@consts/commons';
import { BALOO_2 } from '@consts/font';

import DrawerMenu from './DrawerMenu';
import MenuButton from './MenuButton';

const Header: FC = () => {
  return (
    <header className='fixed top-0 z-40 w-full border-b bg-white/90 backdrop-blur-xs'>
      <div className='flex w-full items-center justify-between px-7 py-6'>
        <Link href={USER_PATHS.home()} className={`flex items-center gap-2 ${BALOO_2.className}`}>
          <h1 className='text-xl font-bold text-[#8B4513]'>{BRAND_TITLE.EN}</h1>
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
