import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends ComponentProps<typeof Link> {}

const MenuButton: FC<PropsWithChildren<IProps>> = ({ children, className, ...linkProps }) => {
  return (
    <Link
      className={cn(
        'text-wood after:bg-wood relative text-sm font-medium after:absolute after:-bottom-[1.5px] after:left-0 after:h-[1.5px] after:w-0 after:rounded-xl after:transition-all after:duration-300 hover:after:w-full',
        className,
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default MenuButton;
