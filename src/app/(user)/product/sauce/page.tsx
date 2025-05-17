import type { FC } from 'react';

import SauceListContact from '@features/user/bread/ui/list/Contact';
import SauceListContent from '@features/user/sauce/ui/list/Content';
import SauceListHead from '@features/user/sauce/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

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
      <SauceListHead />
      <BaseContainer>
        <SauceListContent />
        <SauceListContact />
      </BaseContainer>
    </>
  );
};

export default SauceListPage;
