'use client';

import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { USER_MENU_LIST } from '@consts/commons';

import MenuButton from './MenuButton';

const Menus: FC = () => {
  const pathname = usePathname();

  return (
    <nav className='mr-20 hidden gap-8 lg:flex'>
      {USER_MENU_LIST.map(menu => (
        <MenuButton
          key={menu.title}
          href={menu.href}
          isCurrentRoute={pathname !== USER_PATHS.home() && menu.href.includes(pathname)}
        >
          {menu.title}
        </MenuButton>
      ))}
    </nav>
  );
};

export default Menus;
