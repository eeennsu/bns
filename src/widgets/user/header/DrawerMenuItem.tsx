'use client';

import Link from 'next/link';
import { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

import useCurrentPathname from '@hooks/useCurrentPathname';

interface IProps {
  href: string;
  title: string;
}

const DrawerMenuItem: FC<IProps> = ({ href, title }) => {
  const { getIsCurPathname } = useCurrentPathname();

  return (
    <Link
      href={href}
      className={cn(
        'border-wood-tertiary/20 block border-b pb-2 text-lg font-medium text-[#8b5e3c] transition-colors duration-300 hover:text-[#a86b4c]',
        getIsCurPathname(href) && 'font-bold',
      )}
    >
      {title}
    </Link>
  );
};

export default DrawerMenuItem;
