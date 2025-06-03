import { useEffect, useRef, useState, type FC } from 'react';

import PageContainer from '@components/PageContainer';
import Skeleton from '@components/Skeleton';

const DetailPageLoading: FC = () => {
  const [isShowSkeleton, setIsShowSkeleton] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsShowSkeleton(true);
    }, 1000);

    return (): void => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <PageContainer className={'h-[500px] space-y-6'}>
      {isShowSkeleton && (
        <>
          <Skeleton className='h-[125px] rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-6 w-[85%]' />
            <Skeleton className='h-6 w-[55%]' />
            <Skeleton className='h-6 w-[65%]' />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default DetailPageLoading;
