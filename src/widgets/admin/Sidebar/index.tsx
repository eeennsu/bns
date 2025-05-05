import type { FC } from 'react';

import useSidebarStore from '@stores/sidebar';

interface IProps {
  currentRoute?: string;
  nestedRoutes?: string[];
}

const SidebarWidget: FC<IProps> = ({ currentRoute, nestedRoutes }) => {
  console.log('SidebarWidget', currentRoute, nestedRoutes);
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarStore(state => [
    state.isSidebarOpen,
    state.setIsSidebarOpen,
  ]);

  console.log('isSidebarOpen', isSidebarOpen);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return <div onClick={handleToggleSidebar}>SidebarWidget</div>;
};

export default SidebarWidget;
