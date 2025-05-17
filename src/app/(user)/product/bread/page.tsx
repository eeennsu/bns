import type { FC } from 'react';

import BreadListContact from '@features/user/bread/ui/list/Contact';
import BreadListContent from '@features/user/bread/ui/list/Content';
import BreadListHead from '@features/user/bread/ui/list/Head';

import BaseContainer from './BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams).page;
  console.log('page', page);

  return (
    <>
      <BreadListHead />
      <BaseContainer>
        <BreadListContent />
        <BreadListContact />
      </BaseContainer>
    </>
  );
};

export default BreadListPage;
