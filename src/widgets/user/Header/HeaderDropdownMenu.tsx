'use client';

import useCurrentPathname from '@shared/hooks/useCurrentPathname';
import { cn } from '@shared/shadcn-ui/utils';
import Link from 'next/link';
import { type FC, type PropsWithChildren } from 'react';

import { SubMenu } from '@typings/commons';

interface IProps {
  href?: string;
  subMenus?: SubMenu;
}

const HeaderDropdownMenu: FC<PropsWithChildren<IProps>> = ({ children, href, subMenus = {} }) => {
  const { getIsCurPathname } = useCurrentPathname();

  return (
    <div className='group relative'>
      <Link href={href} className='cursor-pointer text-lg font-semibold text-white'>
        {children}
      </Link>

      <div className='pointer-events-none absolute right-0 left-0 w-56 pt-4 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100'>
        <div className='rounded-xs bg-white px-8 py-6 shadow-sm'>
          <nav className='grid w-full grid-cols-2 gap-x-10 gap-y-4'>
            {Object.values(subMenus).map(subMenu => {
              const isCurrentRoute = getIsCurPathname(subMenu.path, true);

              return (
                <Link
                  key={subMenu.title}
                  href={subMenu.path}
                  className={cn(
                    'hover:text-wood text-base font-normal text-gray-600',
                    isCurrentRoute && 'text-wood',
                  )}
                >
                  {subMenu.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdownMenu;

/*
 <Link
                  href={subMenu.path}
                  className='text-wood hover:text-wood focus:text-wood !min-w-22 px-3 py-2 font-medium'
                >
                  {subMenu.title}
                </Link>
*/
