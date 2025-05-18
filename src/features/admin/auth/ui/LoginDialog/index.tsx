'use client';

import type { FC } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shadcn-ui/ui/dialog';

import useAdminAuthLogin from '../../hooks/useAdminAuthLogin';
import AdminLoginForm from '../Form';

interface IProps {
  onClose: () => void;
}

const LoginDialog: FC<IProps> = ({ onClose }) => {
  const { form, onSubmit } = useAdminAuthLogin();

  return (
    <Dialog defaultOpen onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>관리자 로그인</DialogTitle>
        </DialogHeader>
        <AdminLoginForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
