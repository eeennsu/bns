import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

import DessertListContent from '@features/dessert/ui/list/Content';

import ListHead from '../ListHead';

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
      <ListHead
        title='달콤한 디저트'
        summary='마지막 한 입까지 완벽하게'
        description='부드러운 달콤함이 하루의 속도를 잠시 느리게 만들고, 그 틈에 여유를 채워줍니다.'
        image={UtilLocalImage.IMAGES.DESSERT.LIST}
      />
      <DessertListContent currentPage={page} category={parsedCategory} />
    </>
  );
};

export default DessertListPage;
