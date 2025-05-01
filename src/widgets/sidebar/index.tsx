import type { FC } from 'react';

import useSidebarStore from '@stores/sidebar';

interface IProps {
  currentRoute?: string;
  nestedRoutes?: string[];
}

const SidebarWidget: FC<IProps> = ({ currentRoute, nestedRoutes }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarStore(state => [
    state.isSidebarOpen,
    state.setIsSidebarOpen,
  ]);

  const onToggleSiidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return <div>SidebarWidget</div>;
};

export default SidebarWidget;
