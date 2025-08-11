'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { usePathname } from 'next/navigation';
import { useEffect, type FC } from 'react';

import useCurrentPathname from '@hooks/useCurrentPathname';

import { HEADER_PRODUCT_SUB_MENUS } from '@consts/nav';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import MenuLink from './MenuLink';

interface IProps {
  isScrolled: boolean;
}

const Menus: FC<IProps> = ({ isScrolled }) => {
  const { getIsCurPathname } = useCurrentPathname();
  const { activeIndex, setActiveIndex } = useFullPageScrollStore();

  const pathname = usePathname();

  useEffect(() => {
    setActiveIndex(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className='mr-24 hidden lg:block'>
      <div className='flex items-center gap-14'>
        <MenuLink
          href={MAIN_PATHS.about()}
          isCurrentRoute={getIsCurPathname(MAIN_PATHS.about())}
          activeIndex={activeIndex}
          isScrolled={isScrolled}
          className={cn(
            pathname === '/'
              ? activeIndex === 0
                ? 'text-white after:bg-white'
                : 'text-black after:bg-black'
              : '',
          )}
        >
          소개
        </MenuLink>

        <MenuLink
          href={MAIN_PATHS.event.list()}
          isCurrentRoute={getIsCurPathname(MAIN_PATHS.event.list())}
          activeIndex={activeIndex}
          isScrolled={isScrolled}
          className={cn(
            pathname === '/'
              ? activeIndex === 0
                ? 'text-white after:bg-white'
                : 'text-black after:bg-black'
              : '',
          )}
        >
          이벤트
        </MenuLink>

        <HeaderDropdownMenu
          href={MAIN_PATHS.product.bread.list()}
          subMenus={HEADER_PRODUCT_SUB_MENUS}
          isScrolled={isScrolled}
          className={cn(
            pathname === '/'
              ? activeIndex === 0
                ? 'text-white after:bg-white'
                : 'text-black after:bg-black'
              : '',
          )}
        >
          상품 안내
        </HeaderDropdownMenu>
      </div>
    </nav>
  );
};

export default Menus;
