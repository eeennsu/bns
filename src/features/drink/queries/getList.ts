import 'server-only';

import db from '@db/index';
import { drinks } from '@db/schemas/drinks';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { DRINK_CACHE_TAG, DRINK_CONTEXT } from '@entities/drink/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchDrinkList = async ({ page, pageSize, category }: IParams) => {
  'use cache';
  cacheTag(DRINK_CACHE_TAG.GET_LIST);

  const categoryClause = getCategoryClause(category);
  const whereClause = categoryClause
    ? and(eq(drinks.isHidden, false), categoryClause)
    : eq(drinks.isHidden, false);

  const totalQuery = db.select({ count: count() }).from(drinks).where(whereClause);
  const listQuery = db
    .select({
      id: drinks.id,
      name: drinks.name,
      isSignature: drinks.isSignature,
      isNew: drinks.isNew,
      image: images.url,
    })
    .from(drinks)
    .innerJoin(
      imageReferences,
      and(
        eq(drinks.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DRINK),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(whereClause)
    .orderBy(asc(drinks.sortOrder), asc(drinks.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getDrinkList = (params: IParams) =>
  fetchWithCapture({
    context: DRINK_CONTEXT.GET_LIST,
    fn: fetchDrinkList,
    args: [params],
  });

export default getDrinkList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(drinks.isSignature, true);
    case 'new':
      return eq(drinks.isNew, true);
  }
};
