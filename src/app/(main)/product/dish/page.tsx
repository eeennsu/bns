import { FILTER_TYPES } from '@shared/consts/commons';
import { ProductCategorySchema } from '@shared/contracts/common';
import { parseSchema } from '@shared/libs/parseSchema';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

import DishListContent from '@features/dish/ui/list/Content';

import ListHead from '../ListHead';

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
      <ListHead
        title='스페셜 디쉬 라인업'
        summary='다채로움으로 완성되는 식탁'
        description='상큼한 샐러드, 따뜻한 수프, 그리고 촉촉한 파스타까지.  
  여유로운 하루를 채워주는 브런치 메뉴를 만나보세요.'
        image={UtilLocalImage.IMAGES.DISH.LIST}
      />
      <DishListContent currentPage={page} category={parsedCategory} />
    </>
  );
};

export default DishListPage;
