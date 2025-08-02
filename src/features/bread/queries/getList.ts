import 'server-only';

import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';

import { BREAD_CONTEXT } from '@entities/bread/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchBreadList = async ({ page, pageSize, category }: IParams) => {
  const categoryClause = getCategoryClause(category);
  const whereClause = categoryClause
    ? and(eq(breads.isHidden, false), categoryClause)
    : eq(breads.isHidden, false);

  const totalQuery = db.select({ count: count() }).from(breads).where(whereClause);
  const listQuery = db
    .select({
      id: breads.id,
      name: breads.name,
      isSignature: breads.isSignature,
      isNew: breads.isNew,
      image: images.url,
    })
    .from(breads)
    .innerJoin(
      imageReferences,
      and(
        eq(breads.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.BREAD),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(whereClause)
    .orderBy(asc(breads.sortOrder), asc(breads.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getBreadList = (params: IParams) =>
  fetchWithCapture({
    context: BREAD_CONTEXT.GET_LIST,
    fn: fetchBreadList,
    args: [params],
  });

export default getBreadList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(breads.isSignature, true);
    case 'new':
      return eq(breads.isNew, true);
  }
};
