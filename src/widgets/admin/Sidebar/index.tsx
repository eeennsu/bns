import { House, PanelLeftClose, PanelLeftOpen, Pin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { cn } from '@shadcn-ui/utils';

import { isGroupActive } from '@features/admin/libs/isGroupActive';

import useSidebarStore from '@stores/sidebar';

import { ADMIN_MENUS } from '@consts/nav';

const SidebarWidget: FC = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <aside className='relative'>
      <div
        className={cn(
          'absolute top-4 z-30 transition-all duration-300',
          isSidebarOpen ? 'left-52' : 'left-0',
        )}
      >
        <button
          onClick={handleToggleSidebar}
          className='cursor-pointer rounded-full border border-gray-300 bg-white p-1.5 shadow-md transition hover:bg-gray-100'
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      <section
        className={cn(
          'fixed top-0 left-0 z-20 flex min-h-screen w-56 flex-col gap-4 overflow-y-auto border-r border-gray-200 bg-white p-4 transition-all duration-300',
          isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
        )}
      >
        <Link
          href={MAIN_PATHS.home()}
          className='flex items-center gap-2 text-[14px] font-bold text-sky-600 transition-colors hover:text-sky-800'
        >
          <House size={20} />
          홈으로
        </Link>

        <nav className='flex flex-col gap-3'>
          {ADMIN_MENUS.map((group, index) => {
            const active = isGroupActive(group, pathname);

            return (
              <div key={index} className='space-y-1'>
                <Link
                  href={group[0].path}
                  className={cn(
                    'flex items-center justify-between rounded-md px-2.5 py-1.5 text-[14px] font-medium transition-colors',
                    active ? 'bg-sky-100/80 text-sky-700' : 'text-neutral-700 hover:bg-neutral-100',
                  )}
                >
                  {group[0].menuName}
                  <Pin className='ml-1 size-3.5' color={active ? 'skyblue' : 'lightgray'} />
                </Link>

                <div className='flex flex-col gap-0.5 pl-3'>
                  {group
                    .filter(item => item.order === 1)
                    .map(item => {
                      const isSubActive = pathname === item.path.split('?')[0];
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={cn(
                            'rounded-md px-2 py-1 text-[13px] transition-colors',
                            isSubActive
                              ? 'bg-sky-100/80 text-sky-700'
                              : 'text-neutral-600 hover:bg-neutral-100',
                          )}
                        >
                          {item.menuName}
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </nav>
      </section>
    </aside>
  );
};

export default SidebarWidget;
