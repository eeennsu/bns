'use client';

import { Badge } from '@shared/shadcn-ui/ui';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, type FC, type PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

import { getAdminPageName } from '@features/admin/libs/getMenuName';

import useSidebarStore from '@stores/sidebar';

const RightWidget: FC<PropsWithChildren> = ({ children }) => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen);
  const pathname = usePathname();
  const pageName = getAdminPageName(pathname);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const isDev = url.includes('localhost');
  const isBeta = url.includes('beta');
  const isLive = !isBeta && process.env.NODE_ENV === 'production';

  return (
    <Suspense fallback={<div className='flex min-h-screen items-center justify-center'>...</div>}>
      <main
        className={cn(
          'flex min-h-screen w-full flex-col bg-slate-100 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'ml-56' : 'ml-0',
        )}
      >
        {pageName && (
          <div className='bg-primary z-10 flex w-full items-center justify-between rounded-b-3xl px-7 py-6 shadow-md'>
            <h2 className='ml-6 font-bold tracking-tight text-white'>{pageName}</h2>
            <Badge variant={isLive ? 'destructive' : 'secondary'}>
              {isDev && 'DEV'}
              {isBeta && 'BETA'}
              {isLive && 'LIVE'}
            </Badge>
          </div>
        )}

        <div className='flex w-full flex-1 flex-col px-10 pt-8'>{children}</div>
      </main>
    </Suspense>
  );
};

export default RightWidget;
