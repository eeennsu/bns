'use client';

import { CircleOff, LogOut, RotateCcw } from 'lucide-react';
import { FC, useEffect } from 'react';

import { Button } from '@shadcn-ui/ui';

import useLogout from '@features/auth/hooks/useLogout';

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<IProps> = ({ error, reset }) => {
  const message = error?.message || '알 수 없는 오류가 발생했습니다.';
  const onLogout = useLogout();

  const handleBack = () => {
    onLogout();
  };

  useEffect(() => {
    console.error('Error page : ', error);
  }, [error]);

  return (
    <div className='relative flex h-full items-center justify-center bg-zinc-100 px-4 py-12'>
      <div className='absolute top-10 w-full max-w-md rounded-2xl bg-white/85 p-8 shadow-sm'>
        <div className='flex justify-center'>
          <CircleOff size={40} className='text-destructive' />
        </div>

        <div className='mt-6 text-center'>
          <h2 className='text-xl font-semibold text-gray-800'>문제가 발생했어요</h2>
          <p className='text-muted-foreground mt-2 text-sm'>{message}</p>
          <p className='text-muted-foreground mt-1 text-xs'>
            문제가 지속되면 관리자에게 문의해주세요.
          </p>
        </div>

        <div className='mt-6 flex gap-3'>
          <Button
            onClick={reset}
            variant='outline'
            className='flex flex-grow items-center justify-center gap-2'
          >
            <RotateCcw size={16} />
            다시 시도
          </Button>

          <Button onClick={handleBack} className='flex flex-grow items-center justify-center gap-2'>
            <LogOut size={16} />
            강제 로그아웃 하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
