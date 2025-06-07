'use client';

import type { FC, PropsWithChildren } from 'react';

import RightWidget from '@widgets/admin/right';
import SidebarWidget from '@widgets/admin/sidebar';

import useGetAuthenticate from '@features/auth/hooks/useGetAuthenticate';

const AdminLayoutPage: FC<PropsWithChildren> = ({ children }) => {
  useGetAuthenticate();

  return (
    <main className='flex'>
      <SidebarWidget />
      <RightWidget>{children}</RightWidget>
    </main>
  );
};

export default AdminLayoutPage;
