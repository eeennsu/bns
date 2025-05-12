import type { FC } from 'react';

import Contact from '@features/user/bread/ui/list/Contact';
import Content from '@features/user/bread/ui/list/Content';
import Head from '@features/user/bread/ui/list/Head';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams).page;
  console.log('page', page);

  return (
    <div className='flex flex-col'>
      <Head />
      <Content />
      <Contact />
    </div>
  );
};

export default BreadListPage;
