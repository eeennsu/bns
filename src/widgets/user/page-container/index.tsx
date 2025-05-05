'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import Footer from '../footer';
import Header from '../header';
import { cn } from '@shadcn-ui/utils';

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith(ADMIN_PATHS.home());

  return (
    <>
      {!isAdmin && <Header />}
      <div className={cn('flex-1', !isAdmin && 'pt-19')}>{children}</div>
      {!isAdmin && <Footer />}
    </>
  );
};

export default PageContainer;
