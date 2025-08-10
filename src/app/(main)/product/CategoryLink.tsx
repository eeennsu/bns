import Link, { LinkProps } from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends LinkProps {
  selected?: boolean;
}

const CategoryLink: FC<PropsWithChildren<IProps>> = ({ selected, children, ...props }) => {
  return (
    <Link
      replace
      className={cn(
        'cursor-pointer rounded-full px-4 py-2 text-sm transition-colors',
        selected ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
      )}
      scroll={false}
      {...props}
    >
      {children}
    </Link>
  );
};
export default CategoryLink;
