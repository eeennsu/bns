import type { FC } from 'react';

import Skeleton from '@components/Skeleton';

const TableSkeleton: FC = () => {
  return (
    <div className='absolute top-0 left-0 z-[2] h-full w-full overflow-hidden bg-white px-4'>
      <Skeleton className='my-3 h-16' />
      <div className='mt-6 flex flex-col gap-3'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='h-10' />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
