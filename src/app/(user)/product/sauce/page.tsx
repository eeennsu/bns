import type { FC } from 'react';

import Contact from '@features/user/bread/ui/list/Contact';
import Content from '@features/user/sauce/ui/list/Content';
import Head from '@features/user/sauce/ui/list/Head';

import PageContainer from '../bread/PageContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

const SauceListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams).page;
  console.log('page', page);

  return (
    <>
      <Head />
      <PageContainer>
        <Content />
        <Contact />
      </PageContainer>
    </>
  );
};

export default SauceListPage;
