'use client';

import Link from 'next/link';
import { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

import useCurrentPathname from '@hooks/useCurrentPathname';

interface IProps {
  href: string;
  title: string;
  onCloseDrawer: () => void;
}

const DrawerMenuItem: FC<IProps> = ({ href, title, onCloseDrawer }) => {
  const { getIsCurPathname } = useCurrentPathname();
  const isActive = getIsCurPathname(href);

  return (
    <Link
      href={href}
      onClick={onCloseDrawer}
      className={cn(
        'group relative block rounded-xs border-b border-black/10 px-4 py-3 text-sm font-medium text-black/70 transition-colors duration-300',
        isActive && 'bg-black/5 text-black',
      )}
    >
      {title}
    </Link>
  );
};

export default DrawerMenuItem;
