import 'server-only';

import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { SAUCE_CACHE_TAG, SAUCE_CONTEXT } from '@entities/sauce/consts';

interface IParams {
  id: number;
}

const fetchSauce = async ({ id }: IParams) => {
  'use cache';
  cacheTag(`${SAUCE_CACHE_TAG.GET}:${id}`);

  const sauceQuery = await db
    .select({
      id: sauces.id,
      name: sauces.name,
      description: sauces.description,
      price: sauces.price,
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
    .where(eq(sauces.id, id))
    .limit(1);

  return sauceQuery.at(0);
};

const getSauce = (params: IParams) =>
  fetchWithCapture({
    context: SAUCE_CONTEXT.GET,
    fn: fetchSauce,
    args: [params],
  });

export default getSauce;
