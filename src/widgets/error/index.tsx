import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { NANUM_GOTHIC } from '@consts/font';

const ErrorLayout: FC = () => {
  return (
    <main
      className={`flex size-full flex-grow items-center justify-center bg-gradient-to-br from-[#FFFFF0] to-[#E8D0A9] px-4 py-16 ${NANUM_GOTHIC.className}`}
    >
      <div className='w-full max-w-md space-y-8 text-center'>
        <div className='flex items-center justify-center'>
          <div className='bg-wood/10 rounded-full p-4'>
            <AlertTriangle className='text-wood h-12 w-12' />
          </div>
        </div>

        <div className='space-y-4'>
          <h1 className='text-wood text-4xl font-bold'>오류가 발생했습니다</h1>

          <p className='text-lg text-gray-800'>
            죄송합니다. 데이터를 로드하는 중에 문제가 발생했습니다.
          </p>

          <div className='bg-wood/20 mx-auto my-6 h-px w-76' />

          <p className='text-gray-800'>
            아래 버튼을 클릭하여 다시 시도하거나 홈페이지로 돌아가세요.
          </p>
        </div>

        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded border border-[#8B4513] px-6 py-3 text-[#8B4513] transition-colors hover:bg-[#8B4513] hover:text-[#FFFFF0]'
          >
            <Home className='mr-2 h-4 w-4' />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorLayout;
