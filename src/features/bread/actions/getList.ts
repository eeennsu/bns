'use server';

import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchBreadList = async ({ page, pageSize, category }: IParams) => {
  const breadListQuery = db
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
    .where(and(eq(breads.isHidden, false), getCategoryClause(category)))
    .orderBy(asc(breads.sortOrder))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return breadListQuery;
};

const getBreadList = (params: IParams) =>
  executeWithCapture('getBreadList', fetchBreadList, params);

export default getBreadList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(breads.isSignature, true);
    case 'new':
      return eq(breads.isNew, true);
  }
};
