'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@shadcn-ui/ui';

import Skeleton from '@components/Skeleton';

import AdminDialog from './AdminDialog';
import LoginDialog from './LoginDialog';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  isLoading: boolean;
  isAuthorized: boolean;
}

const AdminEntryPoint: FC<IProps> = ({
  isOpen,
  setIsOpen,
  closeModal,
  isLoading,
  isAuthorized,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-lg'>
        {isLoading ? (
          <DialogTitle className='mt-4 h-full space-y-4'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
          </DialogTitle>
        ) : isAuthorized ? (
          <AdminDialog closeModal={closeModal} />
        ) : (
          <LoginDialog closeModal={closeModal} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminEntryPoint;
