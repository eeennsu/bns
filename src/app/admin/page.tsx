'use client';

import type { FC } from 'react';

import { Button } from '@shadcn-ui/ui/button';

import useAuthHealthCheck from '@features/auth/hooks/useHealthCheck';
import useAuthLogout from '@features/auth/hooks/useLogout';

const AdminPage: FC = () => {
  const onHealthCheck = useAuthHealthCheck();
  const onLogout = useAuthLogout();

  return (
    <main>
      <p>THIS IS ADMIN PAGE!!!!</p>
      <div className='flex gap-4'>
        <Button onClick={onHealthCheck}>Admin Api Check</Button>
        <Button onClick={onLogout}>logout</Button>
      </div>
    </main>
  );
};

export default AdminPage;
