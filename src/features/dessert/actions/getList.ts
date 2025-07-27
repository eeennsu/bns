'use server';

import db from '@db/index';
import { desserts } from '@db/schemas/desserts';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchDessertList = async ({ page, pageSize, category }: IParams) => {
  const dessertListQuery = db
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
    .where(and(eq(desserts.isHidden, false), getCategoryClause(category)))
    .orderBy(asc(desserts.sortOrder))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return dessertListQuery;
};

const getDessertList = (params: IParams) =>
  executeWithCapture('getDessertList', fetchDessertList, params);

export default getDessertList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(desserts.isSignature, true);
    case 'new':
      return eq(desserts.isNew, true);
  }
};
