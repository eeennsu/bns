import type { FC } from 'react';

import SauceListContact from '@features/bread/ui/list/Contact';
import SauceListContent from '@features/sauce/ui/list/Content';
import SauceListHead from '@features/sauce/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';
import { FILTER_TYPES } from '@shared/consts/commons';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const SauceListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || '1';
  const category = (await searchParams)?.category || FILTER_TYPES.ALL;

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
