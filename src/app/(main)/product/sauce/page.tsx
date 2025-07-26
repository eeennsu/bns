import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import SauceListContact from '@features/bread/ui/list/Contact';
import SauceListContent from '@features/sauce/ui/list/Content';
import SauceListHead from '@features/sauce/ui/list/Head';

import BaseContainer from '../bread/BaseContainer';

interface IParams {
  searchParams: Promise<{
    page: string;
    category?: string;
  }>;
}

const SauceListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1', category = FILTER_TYPES.ALL } = await searchParams;
  const parsedCategory = parseSchema(ProductCategorySchema, category, FILTER_TYPES.ALL);

  return (
    <>
      <SauceListHead />
      <BaseContainer>
        <SauceListContent currentPage={page} category={parsedCategory} />
        <SauceListContact />
      </BaseContainer>
    </>
  );
};

export default SauceListPage;
