'use client';

import type { FC } from 'react';

import { Dialog } from '@shadcn-ui/ui';

import AdminDialog from './AdminDialog';
import LoginDialog from './LoginDialog';

interface IProps {
  onCloseModal: () => void;
  isLogin: boolean;
}

const AdminEntryPoint: FC<IProps> = ({ onCloseModal, isLogin }) => {
  return (
    <Dialog defaultOpen onOpenChange={() => onCloseModal()}>
      {isLogin ? (
        <AdminDialog onCloseModal={onCloseModal} />
      ) : (
        <LoginDialog onCloseModal={onCloseModal} />
      )}
    </Dialog>
  );
};

export default AdminEntryPoint;
