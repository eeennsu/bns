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
  console.error('eunsu bang 테스트 에러 콘솔');

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
