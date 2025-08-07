'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { X } from 'lucide-react';
import { useState, type FC, type PropsWithChildren } from 'react';

import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@shadcn-ui/ui';

import DrawerMenuItem from './DrawerMenuItem';

interface IProps {
  triggerClassName?: string;
}

const DrawerMenu: FC<PropsWithChildren<IProps>> = ({ children, triggerClassName }) => {
  const [open, setOpen] = useState(false);
  const onCloseDrawer = () => setOpen(false);

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={triggerClassName}>{children}</DrawerTrigger>
      <DrawerContent className='z-999 space-y-10 bg-white px-4 pt-4 lg:hidden'>
        <div className='flex items-center justify-between'>
          <DrawerTitle className='font-nanum-gothic p-2 text-base font-bold text-black/80'>
            메뉴
          </DrawerTitle>
          <DrawerClose className='cursor-pointer'>
            <X className='size-6 rounded-full p-1 text-black/80 hover:bg-black/80 hover:text-white' />
          </DrawerClose>
        </div>
        <nav className=''>
          <DrawerMenuItem href={MAIN_PATHS.about()} title='소개' onCloseDrawer={onCloseDrawer} />

          <DrawerMenuItem
            href={MAIN_PATHS.event.list()}
            title='이벤트'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.bread.list()}
            title='빵'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.sauce.list()}
            title='소스'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.dish.list()}
            title='디쉬'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.drink.list()}
            title='음료'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.dessert.list()}
            title='디저트'
            onCloseDrawer={onCloseDrawer}
          />

          <DrawerMenuItem
            href={MAIN_PATHS.product.bundle.list()}
            title='세트 구성'
            onCloseDrawer={onCloseDrawer}
          />
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
