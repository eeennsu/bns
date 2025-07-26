'use server';

import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { tryCatchAction } from '@shared/libs/serverAction';
import { IPageParams, ProductCategory } from '@shared/typings/commons';
import { and, asc, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {
  category?: ProductCategory;
}

const fetchSauceList = async ({ page, pageSize, category }: IParams) => {
  const sauceListQuery = db
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
    .where(and(eq(sauces.isHidden, false), getCategoryClause(category)))
    .orderBy(asc(sauces.sortOrder))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return sauceListQuery;
};

const getSauceList = (params: IParams) => tryCatchAction('getSauceList', fetchSauceList, params);

export default getSauceList;

const getCategoryClause = (category?: ProductCategory) => {
  switch (category) {
    case 'signature':
      return eq(sauces.isSignature, true);
    case 'new':
      return eq(sauces.isNew, true);
  }
};
