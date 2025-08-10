import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

import SauceListContent from '@features/sauce/ui/list/Content';

import ListHead from '../ListHead';

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
      <ListHead
        title='소스와 함께'
        summary='빵과 만나 완성되는 맛'
        description='향긋한 잼과 깊이 있는 소스가 바삭하고 부드러운 빵의 매력을 한층 더 끌어올립니다.'
        image={UtilLocalImage.IMAGES.SAUCE.LIST}
      />
      <SauceListContent currentPage={page} category={parsedCategory} />
    </>
  );
};

export default SauceListPage;
