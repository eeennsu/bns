import 'server-only';

import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';

import { DISH_CONTEXT } from '@entities/dish/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchDishList = async ({ page, pageSize, category }: IParams) => {
  const categoryClause = getCategoryClause(category);
  const whereClause = categoryClause
    ? and(eq(dishes.isHidden, false), categoryClause)
    : eq(dishes.isHidden, false);

  const totalQuery = db.select({ count: count() }).from(dishes).where(whereClause);
  const listQuery = db
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
    .where(whereClause)
    .orderBy(asc(dishes.sortOrder), asc(dishes.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getDishList = (params: IParams) =>
  fetchWithCapture({
    context: DISH_CONTEXT.GET_LIST,
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
