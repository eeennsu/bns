import 'server-only';

import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { SAUCE_CACHE_TAG, SAUCE_CONTEXT } from '@entities/sauce/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchSauceList = async ({ page, pageSize, category }: IParams) => {
  'use cache';
  cacheTag(SAUCE_CACHE_TAG.GET_LIST);

  const categoryClause = getCategoryClause(category);
  const whereClause = categoryClause
    ? and(eq(sauces.isHidden, false), categoryClause)
    : eq(sauces.isHidden, false);

  const totalQuery = db.select({ count: count() }).from(sauces).where(whereClause);
  const listQuery = db
    .select({
      id: sauces.id,
      name: sauces.name,
      isSignature: sauces.isSignature,
      isNew: sauces.isNew,
      image: images.url,
    })
    .from(sauces)
    .innerJoin(
      imageReferences,
      and(
        eq(sauces.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.SAUCE),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(whereClause)
    .orderBy(asc(sauces.sortOrder), asc(sauces.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getSauceList = (params: IParams) =>
  fetchWithCapture({
    context: SAUCE_CONTEXT.GET_LIST,
    fn: fetchSauceList,
    args: [params],
  });

export default getSauceList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(sauces.isSignature, true);
    case 'new':
      return eq(sauces.isNew, true);
  }
};
