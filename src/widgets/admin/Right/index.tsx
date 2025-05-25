import type { FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

import useSidebarStore from '@stores/sidebar';

const RightWidget: FC<PropsWithChildren> = ({ children }) => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen);

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col px-10 py-6 transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-58' : 'ml-0',
      )}
    >
      {children}
    </div>
  );
};

export default RightWidget;
