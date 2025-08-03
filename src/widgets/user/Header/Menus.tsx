'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Separator } from '@shared/shadcn-ui/ui';
import { cn } from '@shared/shadcn-ui/utils';
import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import type { FC } from 'react';

import useCurrentPathname from '@hooks/useCurrentPathname';

import { HEADER_PRODUCT_SUB_MENUS } from '@consts/nav';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import MenuLink, { menuLinkVariants } from './MenuLink';

const Menus: FC = () => {
  const { getIsCurPathname } = useCurrentPathname();
  const { activeIndex, setActiveIndex } = useFullPageScrollStore();

  return (
    <nav className='font-asta-sans mr-24 hidden lg:block'>
      <div className='flex items-center gap-10'>
        <button
          className={cn(
            menuLinkVariants({
              activeIndex: activeIndex,
              isCurrentRoute: false,
            }),
          )}
          onClick={() => setActiveIndex(1)}
        >
          시그니처
        </button>

        <button
          className={cn(
            menuLinkVariants({
              activeIndex: activeIndex,
              isCurrentRoute: false,
            }),
          )}
          onClick={() => setActiveIndex(2)}
        >
          이벤트
        </button>

        <Separator
          orientation='vertical'
          className={cn('!h-5 w-4', activeIndex === 0 ? '!bg-white' : 'bg-black')}
        />

        <MenuLink
          href={MAIN_PATHS.about()}
          isCurrentRoute={getIsCurPathname(MAIN_PATHS.about())}
          activeIndex={activeIndex}
          onClick={() => setActiveIndex(0)}
        >
          소개
        </MenuLink>

        <HeaderDropdownMenu
          href={MAIN_PATHS.product.bread.list()}
          subMenus={HEADER_PRODUCT_SUB_MENUS}
        >
          상품 안내
        </HeaderDropdownMenu>
        {/* {MAIN_MENU_LIST.map(menu => {
          if (menu?.subMenus) {
            return (
              <HeaderDropdownMenu key={menu.title} href={menu.path} subMenus={menu.subMenus}>
                {menu.title}
              </HeaderDropdownMenu> 
            );
          }

          if (menu?.pageIndex) {
            return (
              <button
                key={menu.title}
                className={cn(
                  menuLinkVariants({
                    activeIndex: activeIndex,
                    isCurrentRoute: false,
                  }),
                )}
                onClick={() => setActiveIndex(menu.pageIndex)}
              >
                {menu.title}
              </button>
            );
          }

          return (
            <MenuLink
              key={menu.title}
              href={menu.path}
              isCurrentRoute={getIsCurPathname(menu.path)}
              activeIndex={activeIndex}
            >
              {menu.title}
            </MenuLink>
          );
        })} */}
      </div>
    </nav>
  );
};

export default Menus;
