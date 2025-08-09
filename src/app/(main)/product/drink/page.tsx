import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

import DrinkListContent from '@features/drink/ui/list/Content';

import ListHead from '../ListHead';

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
      <ListHead
        title='음료, 한잔의 휴식'
        summary='산뜻한 커피와 맛있는 음료'
        description='포근한 겨울엔 따뜻하게, 청량한 여름엔 시원하게.
계절이 바뀔 때마다 새로운 매력을 담아 한 잔에 전해드립니다.'
        image={UtilLocalImage.IMAGES.DRINK.LIST}
      />

      <DrinkListContent currentPage={page} category={parsedCategory} />
    </>
  );
};

export default DrinkListPage;
