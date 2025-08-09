import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

import BreadListContent from '@features/bread/ui/list/Content';

import ListHead from '../ListHead';

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
      <ListHead
        title='갓 구운 빵'
        summary='오감을 만족시키는 풍미로운 맛'
        description='고소한 버터의 향, 바삭하게 부서지는 크러스트, 입안 가득 퍼지는 부드러움. 눈과 입이 모두 즐거운 저희의 빵 라인업을 지금 확인해 보세요.'
        image={UtilLocalImage.IMAGES.BREAD.LIST}
      />
      <BreadListContent currentPage={page} category={parsedCategory} />
    </>
  );
};

export default BreadListPage;
