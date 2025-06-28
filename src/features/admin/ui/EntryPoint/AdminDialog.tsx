import { MonitorCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { DialogFooter, DialogTitle, Button } from '@shadcn-ui/ui';

import useLogout from '@features/auth/hooks/useLogout';

interface IProps {
  closeModal: () => void;
}

const AdminDialog: FC<IProps> = ({ closeModal }) => {
  const router = useRouter();

  const onLogout = useLogout({ closeModal });

  const onAdminPage = () => {
    router.push(ADMIN_PATHS.product.bread.list(), { scroll: true });
    closeModal();
  };

  return (
    <>
      <DialogTitle className='text-sm font-medium'>
        관리자로 로그인이 되어있습니다. 관리자 페이지로 이동하시겠습니까?
      </DialogTitle>
      <DialogFooter className='flex justify-end gap-4'>
        <Button onClick={onLogout} className='flex-[0.5] text-xs' variant='outline'>
          로그아웃
        </Button>
        <Button className='flex flex-[0.5] items-center gap-2 text-xs' onClick={onAdminPage}>
          <MonitorCog />
          관리자 페이지로 이동
        </Button>
      </DialogFooter>
    </>
  );
};

export default AdminDialog;
