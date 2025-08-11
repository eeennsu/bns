import 'server-only';

import db from '@db/index';
import { drinks } from '@db/schemas/drinks';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { DRINK_CACHE_TAG, DRINK_CONTEXT } from '@entities/drink/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchDrink = async ({ id }: IParams) => {
  'use cache';
  cacheTag(`${DRINK_CACHE_TAG.GET}:${id}`);

  const drinkQuery = await db
    .select({
      id: drinks.id,
      name: drinks.name,
      description: drinks.description,
      price: drinks.price,
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
    .where(eq(drinks.id, id))
    .limit(1);

  return drinkQuery.at(0);
};

const getDrink = (params: IParams) =>
  fetchWithCapture({
    context: DRINK_CONTEXT.GET,
    fn: fetchDrink,
    args: [params],
  });

export default getDrink;
