import { headers } from 'next/headers';
import { FC, PropsWithChildren } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const RootPageContainer: FC<PropsWithChildren> = async ({ children }) => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <div className='flex-1'>{children}</div>
      {!isAdmin && <Footer />}
    </>
  );
};

export default RootPageContainer;
