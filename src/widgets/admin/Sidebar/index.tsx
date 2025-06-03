import { House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { cn } from '@shadcn-ui/utils';

import { isGroupActive } from '@features/admin/libs/isGroupActive';

import useSidebarStore from '@stores/sidebar';

import { ADMIN_MENUS } from '@consts/nav';

import SidebarActions from './Actions';
import FoldingButton from './FoldingButton';
import GroupMenuItem from './GroupMenuItem';

const SidebarWidget: FC = () => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen);

  const pathname = usePathname();

  return (
    <div className='relative'>
      <FoldingButton />

      <aside
        className={cn(
          'fixed top-0 left-0 z-20 flex min-h-screen w-56 flex-col justify-between border-r border-gray-200 bg-white p-4 transition-all duration-300',
          isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
        )}
      >
        <section className='flex flex-col gap-4'>
          <Link
            href={MAIN_PATHS.home()}
            className='flex items-center gap-2 py-2 text-sm font-bold text-sky-600 transition-colors hover:text-sky-800'
          >
            <House size={20} />
            Back To Main
          </Link>

          <nav className='flex max-h-[calc(100vh-10rem)] flex-col gap-3 overflow-y-auto'>
            {ADMIN_MENUS.map(group => {
              const isActive = isGroupActive(group, pathname);

              return <GroupMenuItem key={group[0].path} isActive={isActive} group={group} />;
            })}
          </nav>
        </section>
        <SidebarActions />
      </aside>
    </div>
  );
};

export default SidebarWidget;
