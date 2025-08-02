import 'server-only';

import db from '@db/index';
import { desserts } from '@db/schemas/desserts';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';

import { DESSERT_CONTEXT } from '@entities/dessert/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchDessertList = async ({ page, pageSize, category }: IParams) => {
  const categoryClause = getCategoryClause(category);
  const whereClause = categoryClause
    ? and(eq(desserts.isHidden, false), categoryClause)
    : eq(desserts.isHidden, false);

  const totalQuery = db.select({ count: count() }).from(desserts).where(whereClause);
  const listQuery = db
    .select({
      id: desserts.id,
      name: desserts.name,
      isSignature: desserts.isSignature,
      isNew: desserts.isNew,
      image: images.url,
    })
    .from(desserts)
    .innerJoin(
      imageReferences,
      and(
        eq(desserts.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DESSERT),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(whereClause)
    .orderBy(asc(desserts.sortOrder), asc(desserts.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getDessertList = (params: IParams) =>
  fetchWithCapture({
    context: DESSERT_CONTEXT.GET_LIST,
    fn: fetchDessertList,
    args: [params],
  });

export default getDessertList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(desserts.isSignature, true);
    case 'new':
      return eq(desserts.isNew, true);
  }
};
