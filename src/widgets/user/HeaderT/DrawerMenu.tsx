import { X } from 'lucide-react';
import { useState, type FC, type PropsWithChildren } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcn-ui/ui/drawer';

import { NANUM_GOTHIC } from '@consts/font';
import { USER_MENU_LIST } from '@consts/nav';

import DrawerMenuItem from './DrawerMenuItem';

interface IProps {
  triggerClassName?: string;
}

const DrawerMenu: FC<PropsWithChildren<IProps>> = ({ children, triggerClassName }) => {
  const [open, setOpen] = useState(false);

  const onCloseDrawer = () => setOpen(false);

  const menuItems = USER_MENU_LIST.flatMap(item =>
    item.subMenus ? Object.values(item.subMenus) : [item],
  );

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={triggerClassName}>{children}</DrawerTrigger>
      <DrawerContent className='bg-ivory-tertiary space-y-10 px-6 pt-6 md:hidden'>
        <div className='flex items-center justify-between'>
          <DrawerTitle className={`text-wood-tertiary text-lg font-bold ${NANUM_GOTHIC.className}`}>
            메뉴
          </DrawerTitle>
          <DrawerClose className='cursor-pointer'>
            <X className='text-wood-tertiary h-6 w-6 hover:text-[#a86b4c]' />
          </DrawerClose>
        </div>
        <nav className='space-y-7'>
          {menuItems.map(({ href, title }) => (
            <DrawerMenuItem key={title} href={href} title={title} onCloseDrawer={onCloseDrawer} />
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
