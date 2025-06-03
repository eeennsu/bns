'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import { Dialog } from '@shadcn-ui/ui';

import AdminDialog from './AdminDialog';
import LoginDialog from './LoginDialog';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onCloseModal: () => void;
  isAuthorized: boolean;
}

const AdminEntryPoint: FC<IProps> = ({ isOpen, setIsOpen, onCloseModal, isAuthorized }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isAuthorized ? (
        <AdminDialog onCloseModal={onCloseModal} />
      ) : (
        <LoginDialog onCloseModal={onCloseModal} />
      )}
    </Dialog>
  );
};

export default AdminEntryPoint;
