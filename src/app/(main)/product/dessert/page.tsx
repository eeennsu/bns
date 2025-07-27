import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import DessertListContact from '@features/bread/ui/list/Contact';
import DessertListContent from '@features/dessert/ui/list/Content';
import DessertListHead from '@features/dessert/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const DessertListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1', category = FILTER_TYPES.ALL } = await searchParams;
  const parsedCategory = parseSchema(ProductCategorySchema, category, FILTER_TYPES.ALL);

  return (
    <>
      <DessertListHead />
      <BaseContainer>
        <DessertListContent currentPage={page} category={parsedCategory} />
        <DessertListContact />
      </BaseContainer>
    </>
  );
};

export default DessertListPage;
