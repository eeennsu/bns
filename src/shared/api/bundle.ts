import db from '@db/index';
import {
  bundleBreads,
  bundleDishes,
  bundleDrinks,
  bundles,
  bundleSauces,
} from '@db/schemas/bundles';
import { and, eq } from 'drizzle-orm';

import { BUNDLE_PRODUCT_TYPE } from '@entities/bundle/consts';
import { BundleProduct, BundleProductValue } from '@entities/bundle/types';

const compareAndUpdate = async <T extends { id?: number | string; quantity?: number }>(
  current: { idKey: keyof any; table: any; productIdKey: string },
  existingRows: any[],
  incoming: T[],
  bundleId: number,
) => {
  const toDelete = existingRows.filter(
    (e: any) => !incoming.find(i => i.id === e[current.productIdKey]),
  );

  const toInsert = incoming.filter(i => !existingRows.find(e => e[current.productIdKey] === i.id));

  const toUpdate = incoming.filter(i => {
    const match = existingRows.find(e => e[current.productIdKey] === i.id);
    return match && Number(match.quantity) !== Number(i.quantity);
  });

  await Promise.all([
    ...toDelete.map((d: any) =>
      db
        .delete(current.table)
        .where(
          and(
            eq(current.table.bundleId, bundleId),
            eq(current.table[current.productIdKey], d[current.productIdKey]),
          ),
        ),
    ),
    toInsert.length > 0
      ? db.insert(current.table).values(
          toInsert.map(i => ({
            bundleId,
            [current.productIdKey]: Number(i.id),
            quantity: i.quantity,
          })),
        )
      : null,
    ...toUpdate.map(u =>
      db
        .update(current.table)
        .set({ quantity: u.quantity })
        .where(
          and(eq(current.table.bundleId, bundleId), eq(current.table[current.productIdKey], u.id)),
        ),
    ),
  ]);
};

export const updateBundleProductsDiff = async (bundleId: number, products: BundleProduct[]) => {
  const breads = [];
  const sauces = [];
  const dishes = [];
  const drinks = [];

  for (const product of products) {
    switch (product.type) {
      case BUNDLE_PRODUCT_TYPE.BREAD:
        breads.push(product);
        break;
      case BUNDLE_PRODUCT_TYPE.SAUCE:
        sauces.push(product);
        break;
      case BUNDLE_PRODUCT_TYPE.DISH:
        dishes.push(product);
        break;
      case BUNDLE_PRODUCT_TYPE.DRINK:
        drinks.push(product);
        break;
    }
  }

  // breads
  const existingBreads = await db
    .select()
    .from(bundleBreads)
    .where(eq(bundleBreads.bundleId, bundleId));

  await compareAndUpdate(
    { idKey: 'breadId', table: bundleBreads, productIdKey: 'breadId' },
    existingBreads,
    breads,
    bundleId,
  );

  // sauces
  const existingSauces = await db
    .select()
    .from(bundleSauces)
    .where(eq(bundleSauces.bundleId, bundleId));

  await compareAndUpdate(
    { idKey: 'sauceId', table: bundleSauces, productIdKey: 'sauceId' },
    existingSauces,
    sauces,
    bundleId,
  );

  // dishes
  const existingDishes = await db
    .select()
    .from(bundleDishes)
    .where(eq(bundleDishes.bundleId, bundleId));

  await compareAndUpdate(
    { idKey: 'dishId', table: bundleDishes, productIdKey: 'dishId' },
    existingDishes,
    dishes,
    bundleId,
  );

  // drinks
  const existingDrinks = await db
    .select()
    .from(bundleDrinks)
    .where(eq(bundleDrinks.bundleId, bundleId));

  await compareAndUpdate(
    { idKey: 'drinkId', table: bundleDrinks, productIdKey: 'drinkId' },
    existingDrinks,
    drinks,
    bundleId,
  );
};

export const getLinkedBundlesByProduct = async (productId: number, type: BundleProductValue) => {
  let joinTable;
  let productIdKey;

  switch (type) {
    case BUNDLE_PRODUCT_TYPE.BREAD:
      joinTable = bundleBreads;
      productIdKey = 'breadId';
      break;
    case BUNDLE_PRODUCT_TYPE.SAUCE:
      joinTable = bundleSauces;
      productIdKey = 'sauceId';
      break;
    case BUNDLE_PRODUCT_TYPE.DISH:
      joinTable = bundleDishes;
      productIdKey = 'dishId';
      break;
    case BUNDLE_PRODUCT_TYPE.DRINK:
      joinTable = bundleDrinks;
      productIdKey = 'drinkId';
      break;
    default:
      throw new Error('Invalid product type');
  }

  const linkedBundles = await db
    .select({ id: bundles.id, name: bundles.name })
    .from(joinTable)
    .innerJoin(bundles, eq(joinTable.bundleId, bundles.id))
    .where(eq(joinTable[productIdKey], productId));

  return linkedBundles;
};

export const mapWithType = <T extends { id: number; name: string; price: number }>(
  items: T[],
  type: string,
) => items.map(item => ({ ...item, type }));
