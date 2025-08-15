import { Separator } from '@shared/shadcn-ui/ui';
import { AlertTriangle, Home } from 'lucide-react';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import LinkButton from '@components/LinkButton';

const ErrorLayout: FC = () => {
  return (
    <main className='font-nanum-gothic relative flex size-full flex-1 items-center justify-center bg-neutral-100 px-4 py-10 sm:py-16'>
      <div className='absolute top-0 h-[84px] w-full bg-black/80 lg:h-[108px]' />
      <div className='absolute flex w-full max-w-lg flex-col gap-8 text-center sm:gap-10 lg:top-40'>
        <section className='flex items-center justify-center'>
          <div className='rounded-full bg-neutral-200 p-4 shadow-sm sm:p-6'>
            <AlertTriangle className='size-8 text-neutral-800 sm:size-12' />
          </div>
        </section>

        <section className='space-y-3 sm:space-y-4'>
          <h1 className='text-xl font-bold text-neutral-900 sm:text-3xl'>오류가 발생했습니다</h1>
          <p className='text-sm text-neutral-600 sm:text-base'>
            데이터를 로드하는 중 문제가 발생했습니다.
          </p>

          <Separator className='mx-auto w-20 sm:w-28' />

          <p className='text-xs text-neutral-500 sm:text-sm'>
            아래 버튼을 클릭하여 다시 시도하거나 홈으로 이동하세요.
          </p>
        </section>

        <section className='flex justify-center'>
          <LinkButton
            href={MAIN_PATHS.home()}
            variant='secondary'
            className='bg-neutral-900 text-white hover:bg-neutral-800'
            size='lg'
          >
            <Home className='size-4' />
            홈으로 돌아가기
          </LinkButton>
        </section>
      </div>
    </main>
  );
};

export default ErrorLayout;
