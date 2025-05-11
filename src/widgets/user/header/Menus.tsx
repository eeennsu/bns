'use client';

import type { FC } from 'react';

import useCurrentPathname from '@hooks/useCurrentPathname';

import { USER_MENU_LIST } from '@consts/commons';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import MenuButton from './MenuButton';

const Menus: FC = () => {
  const { getIsCurPathname } = useCurrentPathname();

  return (
    <nav className='mr-20 hidden items-center gap-8 lg:flex'>
      {USER_MENU_LIST.map(menu => {
        const isCurrentRoute = getIsCurPathname(menu.href);

        if (menu?.subMenus) {
          return (
            <HeaderDropdownMenu
              key={menu.title}
              href={menu.href}
              isCurrentRoute={Object.values(menu.subMenus).some(subMenu =>
                getIsCurPathname(subMenu.href),
              )}
              subMenus={menu.subMenus}
            >
              {menu.title}
            </HeaderDropdownMenu>
          );
        }

        return (
          <MenuButton key={menu.title} href={menu.href} isCurrentRoute={isCurrentRoute}>
            {menu.title}
          </MenuButton>
        );
      })}
    </nav>
  );
};

export default Menus;
