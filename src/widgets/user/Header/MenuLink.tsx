import { PageIndex } from '@shared/consts/commons';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

export const menuLinkVariants = cva(
  'after-bg-black relative text-lg font-semibold transition-colors duration-700 after:absolute after:-bottom-[4px] after:left-0 after:h-[1.5px] after:w-0 after:rounded-xl after:transition-all after:duration-300 hover:after:w-full',
  {
    variants: {
      activeIndex: {
        0: 'text-white after:bg-white',
        1: 'text-black after:bg-black',
        2: 'text-black after:bg-black',
      },
      isCurrentRoute: {
        true: 'after:w-full',
        false: '',
      },
      isScrolled: {
        true: 'text-white after:bg-white',
        false: 'text-black after:bg-black',
      },
    },
    defaultVariants: {
      activeIndex: null,
      isCurrentRoute: false,
    },
  },
);

interface IProps extends ComponentProps<typeof Link> {
  isCurrentRoute?: boolean;
  activeIndex: PageIndex;
  isScrolled: boolean;
}

const MenuLink: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  isCurrentRoute,
  activeIndex,
  isScrolled,
  ...linkProps
}) => {
  return (
    <Link
      className={cn(menuLinkVariants({ activeIndex, isCurrentRoute, isScrolled }), className)}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default MenuLink;
