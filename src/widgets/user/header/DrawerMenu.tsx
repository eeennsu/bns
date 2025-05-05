import { X } from 'lucide-react';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcn-ui/ui/drawer';

import { USER_MENU_LIST } from '@consts/commons';
import { NANUM_GOTHIC } from '@consts/font';

interface IProps {}

const DrawerMenu: FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <Drawer direction='right'>
      <DrawerTrigger className='block md:hidden'>{children}</DrawerTrigger>
      <DrawerContent className='space-y-10 bg-[#fff8f0] px-6 pt-6 md:hidden'>
        <div className='flex items-center justify-between'>
          <DrawerTitle className={`text-lg font-bold text-[#8b5e3c] ${NANUM_GOTHIC.className}`}>
            메뉴
          </DrawerTitle>
          <DrawerClose className='cursor-pointer'>
            <X className='h-6 w-6 text-[#8b5e3c] hover:text-[#a86b4c]' />
          </DrawerClose>
        </div>
        <nav className='space-y-7'>
          {USER_MENU_LIST.map(menu => (
            <Link
              key={menu.title}
              href={menu.href}
              className='block border-b border-[#8b5e3c]/20 pb-2 text-lg font-medium text-[#8b5e3c] transition-colors duration-300 hover:text-[#a86b4c]'
            >
              {menu.title}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
