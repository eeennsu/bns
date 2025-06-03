'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import { Dialog } from '@shadcn-ui/ui';

import AdminDialog from './AdminDialog';
import LoginDialog from './LoginDialog';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onCloseModal: () => void;
  isLogin: boolean;
}

const AdminEntryPoint: FC<IProps> = ({ isOpen, setIsOpen, onCloseModal, isLogin }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isLogin ? (
        <AdminDialog onCloseModal={onCloseModal} />
      ) : (
        <LoginDialog onCloseModal={onCloseModal} />
      )}
    </Dialog>
  );
};

export default AdminEntryPoint;
