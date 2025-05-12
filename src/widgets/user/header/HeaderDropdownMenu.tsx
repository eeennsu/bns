'use client';

import { NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { type FC, type PropsWithChildren } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@shadcn-ui/ui/navigation-menu';

import { SubMenu } from '@typings/typings';

import MenuButton from './MenuButton';

interface IProps {
  href?: string;
  isCurrentRoute: boolean;
  subMenus?: SubMenu;
}

const HeaderDropdownMenu: FC<PropsWithChildren<IProps>> = ({
  children,
  href,
  isCurrentRoute,
  subMenus = {},
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <MenuButton
              href={href}
              isCurrentRoute={isCurrentRoute}
              className='!m-0 inline-block !p-0 text-sm'
            >
              {children}
            </MenuButton>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {Object.values(subMenus).map(subMenu => (
              <NavigationMenuLink key={subMenu.title} asChild>
                <Link
                  href={subMenu.href}
                  className='text-wood hover:text-wood focus:text-wood !min-w-22 px-3 py-2 font-semibold'
                >
                  {subMenu.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderDropdownMenu;
