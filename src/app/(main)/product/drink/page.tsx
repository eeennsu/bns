import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import DrinkListContact from '@features/bread/ui/list/Contact';
import DrinkListContent from '@features/drink/ui/list/Content';
import DrinkListHead from '@features/drink/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const DrinkListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1', category = FILTER_TYPES.ALL } = await searchParams;
  const parsedCategory = parseSchema(ProductCategorySchema, category, FILTER_TYPES.ALL);

  return (
    <>
      <DrinkListHead />
      <BaseContainer>
        <DrinkListContent currentPage={page} category={parsedCategory} />
        <DrinkListContact />
      </BaseContainer>
    </>
  );
};

export default DrinkListPage;
