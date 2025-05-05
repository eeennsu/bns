'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import Footer from '../footer/LoginDialog';
import Header from '../header';

const LayoutShell: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith(ADMIN_PATHS.home());

  return (
    <>
      {!isAdmin && <Header />}
      <main className='flex-grow'>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
};

export default LayoutShell;
