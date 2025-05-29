'use client';

import { CircleOff, House, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { Button } from '@shadcn-ui/ui';

import useMeStore from '@stores/me';

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<IProps> = ({ error, reset }) => {
  const router = useRouter();
  const message = error?.message || '알 수 없는 오류가 발생했습니다.';
  const setMe = useMeStore(state => state.setMe);

  const handleBack = () => {
    setMe(null);
    router.push(MAIN_PATHS.home());
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-sm'>
        <div className='flex justify-center'>
          <CircleOff className='text-red-500' />
        </div>
        <div className='mt-6 text-center'>
          <p className='text-lg text-gray-600'>{message}</p>
          <p className='my-4 text-xs'>문제가 지속되면 개발자에게 도움을 요청해주세요.</p>

          <div className='flex items-center gap-4'>
            <Button onClick={() => reset()} variant='outline' className='flex-grow'>
              <RotateCcw />
              다시 시도하기
            </Button>

            <Button onClick={handleBack} className='flex-grow'>
              <House />
              홈으로 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
