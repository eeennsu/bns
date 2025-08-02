import 'server-only';

import db from '@db/index';
import { breads } from '@db/schemas/breads';
import {
  bundles,
  bundleBreads,
  bundleSauces,
  bundleDishes,
  bundleDrinks,
  bundleDesserts,
} from '@db/schemas/bundles';
import { desserts } from '@db/schemas/desserts';
import { dishes } from '@db/schemas/dishes';
import { drinks } from '@db/schemas/drinks';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, asc, eq } from 'drizzle-orm';

import { BUNDLE_CONTEXT } from '@entities/bundle/consts';
import { IBundleDisplay } from '@entities/bundle/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchBundle = async ({ id }: IParams): Promise<IBundleDisplay | null> => {
  const [bundleRow] = await db
    .select({
      id: bundles.id,
      name: bundles.name,
      description: bundles.description,
      price: bundles.price,
      discountedPrice: bundles.discountedPrice,
      sortOrder: bundles.sortOrder,
    })
    .from(bundles)
    .where(eq(bundles.id, id));

  if (!bundleRow) return null;

  const imagesData = await db
    .select({
      id: imageReferences.imageId,
      url: images.url,
      bundleId: imageReferences.refId,
    })
    .from(imageReferences)
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(
      and(eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE), eq(imageReferences.refId, id)),
    )
    .orderBy(asc(imageReferences.sortOrder));

  const [breadsData, saucesData, dishesData, drinksData, dessertsData] = await Promise.all([
    db
      .select({
        id: breads.id,
        name: breads.name,
        quantity: bundleBreads.quantity,
      })
      .from(bundleBreads)
      .innerJoin(breads, eq(bundleBreads.breadId, breads.id))
      .where(eq(bundleBreads.bundleId, id)),
    db
      .select({
        id: sauces.id,
        name: sauces.name,
        quantity: bundleSauces.quantity,
      })
      .from(bundleSauces)
      .innerJoin(sauces, eq(bundleSauces.sauceId, sauces.id))
      .where(eq(bundleSauces.bundleId, id)),
    db
      .select({
        id: dishes.id,
        name: dishes.name,
        quantity: bundleDishes.quantity,
      })
      .from(bundleDishes)
      .innerJoin(dishes, eq(bundleDishes.dishId, dishes.id))
      .where(eq(bundleDishes.bundleId, id)),
    db
      .select({
        id: drinks.id,
        name: drinks.name,
        quantity: bundleDrinks.quantity,
      })
      .from(bundleDrinks)
      .innerJoin(drinks, eq(bundleDrinks.drinkId, drinks.id))
      .where(eq(bundleDrinks.bundleId, id)),
    db
      .select({
        id: desserts.id,
        name: desserts.name,
        quantity: bundleDesserts.quantity,
      })
      .from(bundleDesserts)
      .innerJoin(desserts, eq(bundleDesserts.dessertId, desserts.id))
      .where(eq(bundleDesserts.bundleId, id)),
  ]);

  const bundle: IBundleDisplay = {
    ...bundleRow,
    images: imagesData.map(img => ({ id: img.id, url: img.url })),
    products: {
      breads: breadsData || [],
      sauces: saucesData || [],
      dishes: dishesData || [],
      drinks: drinksData || [],
      desserts: dessertsData || [],
    },
  };

  return bundle;
};

const getBundle = (params: IParams) =>
  fetchWithCapture({
    context: BUNDLE_CONTEXT.GET,
    fn: fetchBundle,
    args: [params],
  });

export default getBundle;
