import type { FC, PropsWithChildren } from 'react';

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container flex !max-w-7xl flex-col gap-6 pb-6 sm:gap-10 sm:pb-10'>
      {children}
    </div>
  );
};

export default PageContainer;
