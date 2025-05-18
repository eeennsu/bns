import type { FC } from 'react';

import BreadListContact from '@features/user/bread/ui/list/Contact';
import BreadListContent from '@features/user/bread/ui/list/Content';
import BreadListHead from '@features/user/bread/ui/list/Head';

import BaseContainer from './BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || '1';
  const category = (await searchParams)?.category || 'all';

  return (
    <>
      <BreadListHead />
      <BaseContainer>
        <BreadListContent currentPage={page} category={category} />
        <BreadListContact />
      </BaseContainer>
    </>
  );
};

export default BreadListPage;
