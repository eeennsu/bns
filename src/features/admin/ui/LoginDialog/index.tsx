'use client';

import type { FC } from 'react';

import { DialogContent, DialogHeader, DialogTitle } from '@shadcn-ui/ui/dialog';

import useLogin from '@features/auth/hooks/useLogin';

import AdminLoginForm from '../Form';

interface IProps {
  onClose: () => void;
}

const AdminLoginDialog: FC<IProps> = ({ onClose }) => {
  const { form, onSubmit } = useLogin({ onCloseLoginModal: onClose });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>관리자 로그인</DialogTitle>
      </DialogHeader>
      <AdminLoginForm form={form} onSubmit={onSubmit} />
    </DialogContent>
  );
};

export default AdminLoginDialog;
