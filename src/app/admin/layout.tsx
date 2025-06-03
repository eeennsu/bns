'use client';

import type { FC, PropsWithChildren } from 'react';

import RightWidget from '@widgets/admin/rightW';
import SidebarWidget from '@widgets/admin/sidebarW';

import useGetAuthenticate from '@features/auth/hooks/useGetAuthenticate';

const AdminLayoutPage: FC<PropsWithChildren> = ({ children }) => {
  const { me } = useGetAuthenticate();

  return (
    me?.role === 'admin' && (
      <main className='flex'>
        <SidebarWidget />
        <RightWidget>{children}</RightWidget>
      </main>
    )
  );
};

export default AdminLayoutPage;
