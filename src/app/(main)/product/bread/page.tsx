import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import BreadListContact from '@features/bread/ui/list/Contact';
import BreadListContent from '@features/bread/ui/list/Content';
import BreadListHead from '@features/bread/ui/list/Head';

import BaseContainer from './BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1', category = FILTER_TYPES.ALL } = await searchParams;
  const parsedCategory = parseSchema(ProductCategorySchema, category, FILTER_TYPES.ALL);

  return (
    <>
      <BreadListHead />
      <BaseContainer>
        <BreadListContent currentPage={page} category={parsedCategory} />
        <BreadListContact />
      </BaseContainer>
    </>
  );
};

export default BreadListPage;
