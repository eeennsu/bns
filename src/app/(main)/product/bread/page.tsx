import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import type { FC } from 'react';

import BreadListContent from '@features/bread/ui/list/Content';
import BreadListHead from '@features/bread/ui/list/Head';

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
    <div className='flex flex-col gap-4 lg:gap-6'>
      <BreadListHead />
      <BreadListContent currentPage={page} category={parsedCategory} />
    </div>
  );
};

export default BreadListPage;
