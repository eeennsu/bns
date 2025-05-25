'use client';

import type { FC, PropsWithChildren } from 'react';

import { Button } from '@shadcn-ui/ui/button';

import RightWidget from '@widgets/admin/Right';
import SidebarWidget from '@widgets/admin/Sidebar';

import useAuthHealthCheck from '@features/auth/hooks/useHealthCheck';

const AdminLayoutPage: FC<PropsWithChildren> = ({ children }) => {
  const onHealthCheck = useAuthHealthCheck();

  return (
    <>
      <main className='flex'>
        <SidebarWidget />
        <RightWidget>
          <div className='flex gap-4'>
            <Button onClick={onHealthCheck}>Admin Api Check</Button>
          </div>

          {children}
        </RightWidget>
      </main>
    </>
  );
};

export default AdminLayoutPage;
