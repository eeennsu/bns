'use client';

import type { FC } from 'react';

import useCurrentPathname from '@hooks/useCurrentPathname';

import { MAIN_MENU_LIST } from '@consts/nav';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import MenuButton from './MenuButton';

const Menus: FC = () => {
  const { getIsCurPathname } = useCurrentPathname();

  return (
    <nav className='mr-20 hidden items-center gap-8 lg:flex'>
      {MAIN_MENU_LIST.map(menu => {
        const isCurrentRoute = getIsCurPathname(menu.path);

        if (menu?.subMenus) {
          return (
            <HeaderDropdownMenu
              key={menu.title}
              href={menu.path}
              isCurrentRoute={Object.values(menu.subMenus).some(subMenu =>
                getIsCurPathname(subMenu.path),
              )}
              subMenus={menu.subMenus}
            >
              {menu.title}
            </HeaderDropdownMenu>
          );
        }

        return (
          <MenuButton key={menu.title} href={menu.path} isCurrentRoute={isCurrentRoute}>
            {menu.title}
          </MenuButton>
        );
      })}
    </nav>
  );
};

export default Menus;
