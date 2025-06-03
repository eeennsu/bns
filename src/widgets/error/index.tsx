import { AlertTriangle, Home } from 'lucide-react';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import LinkButton from '@components/LinkButton';

const ErrorLayout: FC = () => {
  return (
    <main className='font-nanum-gothic flex size-full flex-1 items-center justify-center bg-white px-4 py-16'>
      <div className='w-full max-w-md space-y-8 text-center'>
        <section className='flex items-center justify-center'>
          <div className='bg-wood/10 rounded-full p-4'>
            <AlertTriangle className='text-wood size-12' />
          </div>
        </section>

        <section className='space-y-4'>
          <h1 className='text-wood text-4xl font-bold'>오류가 발생했습니다</h1>

          <p className='text-lg text-gray-800'>
            죄송합니다. 데이터를 로드하는 중에 문제가 발생했습니다.
          </p>

          <div className='bg-wood/20 mx-auto my-6 h-px w-76' />

          <p className='text-gray-800'>
            아래 버튼을 클릭하여 다시 시도하거나 홈페이지로 돌아가세요.
          </p>
        </section>

        <section className='flex flex-col justify-center gap-4 sm:flex-row'>
          <LinkButton href={MAIN_PATHS.home()} variant='ivory'>
            <Home className='size-4' />
            홈으로 돌아가기
          </LinkButton>
        </section>
      </div>
    </main>
  );
};

export default ErrorLayout;
