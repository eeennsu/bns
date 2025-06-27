import { MonitorCog } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { DialogFooter, DialogTitle, Button } from '@shadcn-ui/ui';

import useLogout from '@features/auth/hooks/useLogout';

interface IProps {
  closeModal: () => void;
}

const AdminDialog: FC<IProps> = ({ closeModal }) => {
  const onLogout = useLogout({ closeModal });

  return (
    <>
      <DialogTitle className='text-sm font-medium'>
        관리자로 로그인이 되어있습니다. 관리자 페이지로 이동하시겠습니까?
      </DialogTitle>
      <DialogFooter className='flex justify-end gap-4'>
        <Button onClick={onLogout} className='flex-[0.5] text-xs' variant='outline'>
          로그아웃
        </Button>
        <Button className='flex-[0.5] text-xs' onClickCapture={closeModal}>
          <Link className='flex items-center gap-2' href={ADMIN_PATHS.product.bread.list()}>
            <MonitorCog />
            관리자 페이지로 이동
          </Link>
        </Button>
      </DialogFooter>
    </>
  );
};

export default AdminDialog;
