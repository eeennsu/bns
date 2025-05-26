'use client';

import type { FC, PropsWithChildren } from 'react';

import RightWidget from '@widgets/admin/Right';
import SidebarWidget from '@widgets/admin/Sidebar';

const AdminLayoutPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className='flex'>
        <SidebarWidget />
        <RightWidget>{children}</RightWidget>
      </main>
    </>
  );
};

export default AdminLayoutPage;
