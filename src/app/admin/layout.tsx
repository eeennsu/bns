'use client';

import type { FC, PropsWithChildren } from 'react';

import RightWidget from '@widgets/admin/right';
import SidebarWidget from '@widgets/admin/sidebar';

import useAuthSync from '@features/auth/hooks/useAuthSync';

const AdminLayoutPage: FC<PropsWithChildren> = ({ children }) => {
  const { session } = useAuthSync();

  if (!session) return null;

  return (
    <main className='flex'>
      <SidebarWidget />
      <RightWidget>{children}</RightWidget>
    </main>
  );
};

export default AdminLayoutPage;
