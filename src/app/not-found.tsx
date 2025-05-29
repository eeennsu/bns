import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { Button } from '@shadcn-ui/ui';

const NotFoundPage: FC = () => {
  return (
    <main className='font-nanum-gothic flex size-full flex-1 items-center justify-center bg-gradient-to-br from-[#FFFFF0] to-[#E8D0A9] px-4 pt-19 pb-16'>
      <div className='flex w-full max-w-lg flex-col items-center gap-8 text-center'>
        <div className='space-y-4'>
          <h1 className='text-wood flex w-full items-center justify-center gap-2 text-4xl font-bold'>
            페이지를 찾을 수 없습니다
          </h1>

          <p className='text-lg text-gray-800'>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>

          <div className='bg-wood/20 mx-auto my-6 h-px w-76' />

          <p className='text-gray-800'>아래 버튼을 클릭하여 홈페이지로 돌아가세요.</p>
        </div>

        <Link href={MAIN_PATHS.home()}>
          <Button variant='wood' size='lg'>
            <ArrowLeft />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
