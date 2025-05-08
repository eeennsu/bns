import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type FC, type PropsWithChildren } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcn-ui/ui/drawer';
import { cn } from '@shadcn-ui/utils';

import { USER_MENU_LIST } from '@consts/commons';
import { NANUM_GOTHIC } from '@consts/font';

interface IProps {}

const DrawerMenu: FC<PropsWithChildren<IProps>> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerTrigger className='block md:hidden'>{children}</DrawerTrigger>
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
          {USER_MENU_LIST.map(menu => (
            <Link
              key={menu.title}
              href={menu.href}
              className={cn(
                'border-wood-tertiary/20 block border-b pb-2 text-lg font-medium text-[#8b5e3c] transition-colors duration-300 hover:text-[#a86b4c]',
                pathname !== USER_PATHS.home() && menu.href.includes(pathname) && 'font-bold',
              )}
              onClick={() => setOpen(false)}
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
