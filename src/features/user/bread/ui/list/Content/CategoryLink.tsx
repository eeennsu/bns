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
        'cursor-pointer rounded-full px-4 py-2 text-sm',
        selected
          ? 'bg-[#8B4513] text-[#FFFFF0]'
          : 'bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10',
      )}
      scroll={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CategoryLink;
