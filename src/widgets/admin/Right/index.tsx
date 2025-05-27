import { usePathname } from 'next/navigation';
import type { FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

import { getAdminPageName } from '@features/admin/libs/getMenuName';

import useSidebarStore from '@stores/sidebar';

const RightWidget: FC<PropsWithChildren> = ({ children }) => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen);
  const pathname = usePathname();
  const pageName = getAdminPageName(pathname);

  return (
    <main
      className={cn(
        'flex min-h-screen w-full flex-col transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-58' : 'ml-0',
      )}
    >
      {pageName && (
        <div className='bg-primary sticky top-0 z-10 w-full rounded-b-3xl px-7 py-6 text-white shadow-md'>
          <h2 className='font-bold tracking-tight'>{pageName}</h2>
        </div>
      )}

      <div className='w-full flex-1 px-8 pt-8'>{children}</div>
    </main>
  );
};

export default RightWidget;
