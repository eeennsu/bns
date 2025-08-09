'use client';

import useCurrentPathname from '@shared/hooks/useCurrentPathname';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import Link from 'next/link';
import { type FC, type PropsWithChildren } from 'react';

import { SubMenu } from '@typings/commons';

interface IProps {
  href?: string;
  subMenus?: SubMenu;
  className?: string;
}

const HeaderDropdownMenu: FC<PropsWithChildren<IProps>> = ({
  children,
  href,
  subMenus = {},
  className,
}) => {
  const { getIsCurPathname } = useCurrentPathname();
  const { activeIndex } = useFullPageScrollStore();

  return (
    <div className='group relative'>
      <Link
        href={href}
        className={cn(
          'cursor-pointer font-medium transition-colors duration-700',
          activeIndex === 0 ? 'text-white' : 'text-black',
          className,
        )}
      >
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
                    'font-normal text-gray-600 hover:text-black',
                    isCurrentRoute && 'text-black',
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
