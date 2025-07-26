'use client';

import type { FC } from 'react';

import { DialogHeader, DialogTitle } from '@shadcn-ui/ui';

import useLogin from '@features/auth/hooks/useLogin';

import AdminLoginForm from '../Form';

interface IProps {
  closeModal: () => void;
}

const LoginDialog: FC<IProps> = ({ closeModal }) => {
  const { form, onSubmit, isLoadingLogin } = useLogin({ closeModal });

  return (
    <>
      <DialogHeader>
        <DialogTitle>관리자 로그인</DialogTitle>
      </DialogHeader>
      <AdminLoginForm form={form} onSubmit={onSubmit} isLoadingLogin={isLoadingLogin} />
    </>
  );
};

export default LoginDialog;
