import type { FC } from 'react';

import BreadListContact from '@features/bread/ui/list/Contact';
import BreadListContent from '@features/bread/ui/list/Content';
import BreadListHead from '@features/bread/ui/list/Head';

import BaseContainer from './BaseContainer';
import { FILTER_TYPES } from '@shared/consts/commons';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || '1';
  const category = (await searchParams)?.category || FILTER_TYPES.ALL;

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
