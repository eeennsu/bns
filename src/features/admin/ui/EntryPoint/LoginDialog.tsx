'use client';

import type { FC } from 'react';

import { DialogContent, DialogHeader, DialogTitle } from '@shadcn-ui/ui/dialog';

import useLogin from '@features/auth/hooks/useLogin';

import AdminLoginForm from '../Form';

interface IProps {
  onCloseModal: () => void;
}

const LoginDialog: FC<IProps> = ({ onCloseModal }) => {
  const { form, onSubmit } = useLogin({ onCloseModal });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>관리자 로그인</DialogTitle>
      </DialogHeader>
      <AdminLoginForm form={form} onSubmit={onSubmit} />
    </DialogContent>
  );
};

export default LoginDialog;
