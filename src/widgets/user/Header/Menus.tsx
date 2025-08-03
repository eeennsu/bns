'use client';

import type { FC } from 'react';

import useCurrentPathname from '@hooks/useCurrentPathname';

import { MAIN_MENU_LIST } from '@consts/nav';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import MenuButton from './MenuButton';

const Menus: FC = () => {
  const { getIsCurPathname } = useCurrentPathname();

  return (
    <nav className='font-asta-sans mr-24 hidden lg:block'>
      <div className='flex items-center gap-10'>
        {MAIN_MENU_LIST.map(menu => {
          if (menu?.subMenus) {
            return (
              <HeaderDropdownMenu key={menu.title} href={menu.path} subMenus={menu.subMenus}>
                {menu.title}
              </HeaderDropdownMenu>
            );
          }

          return (
            <MenuButton
              key={menu.title}
              href={menu.path}
              isCurrentRoute={getIsCurPathname(menu.path)}
            >
              {menu.title}
            </MenuButton>
          );
        })}
      </div>
    </nav>
  );
};

export default Menus;
