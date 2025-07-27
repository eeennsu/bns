'use server';

import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchDishList = async ({ page, pageSize, category }: IParams) => {
  const dishListQuery = db
    .select({
      id: dishes.id,
      name: dishes.name,
      isSignature: dishes.isSignature,
      isNew: dishes.isNew,
      image: images.url,
    })
    .from(dishes)
    .innerJoin(
      imageReferences,
      and(
        eq(dishes.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(and(eq(dishes.isHidden, false), getCategoryClause(category)))
    .orderBy(asc(dishes.sortOrder))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return dishListQuery;
};

const getDishList = (params: IParams) =>
  executeWithCapture({
    context: 'GET_DISH_LIST',
    fn: fetchDishList,
    args: [params],
  });

export default getDishList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(dishes.isSignature, true);
    case 'new':
      return eq(dishes.isNew, true);
  }
};
