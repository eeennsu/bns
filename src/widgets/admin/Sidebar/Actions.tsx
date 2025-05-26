import { Fan, LogOut } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@shadcn-ui/ui/button';

import useAuthHealthCheck from '@features/auth/hooks/useHealthCheck';
import useLogout from '@features/auth/hooks/useLogout';

const SidebarActions: FC = () => {
  const { onHealthCheck } = useAuthHealthCheck();
  const onLogout = useLogout();

  return (
    <section className='flex flex-col gap-3'>
      <Button onClick={onHealthCheck} size='sm' className='w-full'>
        <Fan className='animate-spin' />
        기능 작동 체크
      </Button>
      <Button onClick={onLogout} variant='outline'>
        <LogOut />
        로그아웃
      </Button>
    </section>
  );
};

export default SidebarActions;
