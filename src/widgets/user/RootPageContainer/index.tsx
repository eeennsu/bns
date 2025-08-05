'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const RootPageContainer: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <div className='grow'>{children}</div>
      {!isAdmin && pathname !== '/' && <Footer />}
    </>
  );
};

export default RootPageContainer;
