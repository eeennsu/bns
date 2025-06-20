import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends ComponentProps<typeof Link> {
  isCurrentRoute?: boolean;
}

const MenuButton: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  isCurrentRoute,
  ...linkProps
}) => {
  return (
    <Link
      className={cn(
        'text-wood after:bg-wood relative text-sm font-semibold after:absolute after:-bottom-[2px] after:left-0 after:h-[1.5px] after:w-0 after:rounded-xl after:transition-all after:duration-300 hover:after:w-full',
        isCurrentRoute && 'after:w-full',
        className,
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default MenuButton;
