import 'server-only';

import db from '@db/index';
import { desserts } from '@db/schemas/desserts';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { DESSERT_CACHE_TAG, DESSERT_CONTEXT } from '@entities/dessert/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchDessert = async ({ id }: IParams) => {
  'use cache';
  cacheTag(DESSERT_CACHE_TAG.GET_LIST);

  const dessertQuery = await db
    .select({
      id: desserts.id,
      name: desserts.name,
      description: desserts.description,
      price: desserts.price,
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
    .where(eq(desserts.id, id))
    .limit(1);

  return dessertQuery.at(0);
};

const getDessert = (params: IParams) =>
  fetchWithCapture({
    context: DESSERT_CONTEXT.GET,
    fn: fetchDessert,
    args: [params],
  });

export default getDessert;
