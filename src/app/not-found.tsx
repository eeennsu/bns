import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { Button } from '@shadcn-ui/ui';

const NotFoundPage: FC = () => {
  return (
    <main className='font-nanum-gothic flex size-full flex-1 items-center justify-center bg-neutral-100 px-4 py-10 sm:py-16'>
      <div className='flex w-full max-w-lg flex-col items-center gap-8 text-center sm:gap-10'>
        <div className='space-y-3 sm:space-y-4'>
          <h1 className='text-xl font-bold text-neutral-900 sm:text-3xl'>
            페이지를 찾을 수 없습니다
          </h1>
          <p className='text-sm text-neutral-600 sm:text-base'>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>

          <div className='mx-auto my-6 h-px w-20 bg-neutral-300 sm:w-28' />

          <p className='text-xs text-neutral-500 sm:text-sm'>
            아래 버튼을 클릭하여 홈페이지로 돌아가세요.
          </p>
        </div>

        <Link href={MAIN_PATHS.home()}>
          <Button
            variant='secondary'
            size='lg'
            className='bg-neutral-900 text-white hover:bg-neutral-800'
          >
            <ArrowLeft className='size-4' />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
