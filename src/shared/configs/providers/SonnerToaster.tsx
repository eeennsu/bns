import type { FC } from 'react';
import { Toaster } from 'sonner';

const SonnerToaster: FC = () => {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          toast: 'border shadow-xl rounded-xl text-sm font-medium px-4 py-3', // 공통 스타일
          title: 'font-semibold',
          description: 'text-sm opacity-80',
          success: '!bg-emerald-500 !text-white border-emerald-600',
          error: '!bg-red-500 !text-white border-rose-600',
          warning: '!bg-amber-400 !text-white border-amber-500',
          info: '!bg-sky-500 !text-white border-sky-600',
        },
        duration: 4000,
      }}
    />
  );
};

export default SonnerToaster;
