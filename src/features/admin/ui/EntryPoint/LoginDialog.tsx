'use client';

import type { FC } from 'react';

import { DialogHeader, DialogTitle } from '@shadcn-ui/ui';

import useLogin from '@features/auth/hooks/useLogin';

import AdminLoginForm from '../Form';

interface IProps {
  onCloseModal: () => void;
}

const LoginDialog: FC<IProps> = ({ onCloseModal }) => {
  const { form, onSubmit } = useLogin({ onCloseModal });

  return (
    <>
      <DialogHeader>
        <DialogTitle>관리자 로그인</DialogTitle>
      </DialogHeader>
      <AdminLoginForm form={form} onSubmit={onSubmit} />
    </>
  );
};

export default LoginDialog;
