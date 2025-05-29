import { Suspense, type FC, type PropsWithChildren } from 'react';

const ListPageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={<div className='flex min-h-screen items-center justify-center'>...</div>}>
      <div className='flex flex-col gap-6 rounded-lg bg-white p-6'>{children}</div>
    </Suspense>
  );
};

export default ListPageContainer;
