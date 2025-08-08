import { cva } from 'class-variance-authority';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

export const menuLinkVariants = cva(
  'relative text-lg font-semibold cursor-pointer transition-colors duration-700 after:absolute after:-bottom-[2px] after:left-0 after:h-[1.5px] after:w-0 after:rounded-xl after:transition-all after:duration-300 hover:after:w-full after-bg-black',
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
    },
    defaultVariants: {
      activeIndex: null,
      isCurrentRoute: false,
    },
  },
);

interface IProps extends ComponentProps<typeof Link> {
  isCurrentRoute?: boolean;
  activeIndex: number;
}

const MenuLink: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  isCurrentRoute,
  activeIndex,
  ...linkProps
}) => {
  return (
    <Link
      className={cn(
        'relative text-lg font-semibold transition-colors duration-700',
        isCurrentRoute && 'after:w-full',
        activeIndex === 0 ? 'text-white' : 'text-black',
        className,
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default MenuLink;
