import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

import useSidebarStore from '@stores/sidebar';

const FoldingButton: FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
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
  );
};

export default FoldingButton;
