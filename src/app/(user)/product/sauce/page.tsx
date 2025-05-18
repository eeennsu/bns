import type { FC } from 'react';

import SauceListContact from '@features/user/bread/ui/list/Contact';
import SauceListContent from '@features/user/sauce/ui/list/Content';
import SauceListHead from '@features/user/sauce/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const SauceListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || '1';
  const category = (await searchParams)?.category || 'all';

  return (
    <>
      <SauceListHead />
      <BaseContainer>
        <SauceListContent currentPage={page} category={category} />
        <SauceListContact />
      </BaseContainer>
    </>
  );
};

export default SauceListPage;
