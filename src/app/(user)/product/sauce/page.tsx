import type { FC } from 'react';

import Contact from '@features/user/bread/ui/list/Contact';
import Content from '@features/user/sauce/ui/list/Content';
import Head from '@features/user/sauce/ui/list/Head';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

const SauceListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams).page;
  console.log('page', page);

  return (
    <div className='container flex !max-w-7xl flex-col'>
      <Head />
      <Content />
      <Contact />
    </div>
  );
};

export default SauceListPage;
