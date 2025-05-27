import type { FC } from 'react';

import Skeleton from '@components/Skeleton';

const TableSkeleton: FC = () => {
  return (
    <div className='absolute top-0 left-0 z-[2] h-full w-full space-y-2 overflow-hidden bg-white px-4'>
      <Skeleton className='mt-2 h-16' />
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className='h-16' />
      ))}
    </div>
  );
};

export default TableSkeleton;
