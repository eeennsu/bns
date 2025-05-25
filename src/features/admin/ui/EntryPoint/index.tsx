'use client';

import { MonitorCog } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@shadcn-ui/ui/dialog';

import useMeStore from '@stores/me';

import AdminLoginDialog from '../LoginDialog';

interface IProps {
  onClose: () => void;
}

const AdminEntryPoint: FC<IProps> = ({ onClose }) => {
  const me = useMeStore(state => state.me);

  return (
    <Dialog defaultOpen onOpenChange={() => onClose()}>
      {me?.isLogin ? (
        <DialogContent className='sm:max-w-md'>
          <DialogTitle className='text-sm font-medium'>
            로그인이 되어있습니다. 관리자 페이지로 이동하시겠습니까?
          </DialogTitle>
          <Link href={ADMIN_PATHS.dashboard()}>
            <Button className='w-full gap-4'>
              <MonitorCog />
              관리자 페이지로 이동
            </Button>
          </Link>
        </DialogContent>
      ) : (
        <AdminLoginDialog onClose={onClose} />
      )}
    </Dialog>
  );
};

export default AdminEntryPoint;
