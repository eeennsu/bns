import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import DishListContact from '@features/bread/ui/list/Contact';
import DishListContent from '@features/dish/ui/list/Content';
import DishListHead from '@features/dish/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const DishListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1', category = FILTER_TYPES.ALL } = await searchParams;
  const parsedCategory = parseSchema(ProductCategorySchema, category, FILTER_TYPES.ALL);

  return (
    <>
      <DishListHead />
      <BaseContainer>
        <DishListContent currentPage={page} category={parsedCategory} />
        <DishListContact />
      </BaseContainer>
    </>
  );
};

export default DishListPage;
