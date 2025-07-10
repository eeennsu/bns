import db from '@db/index';
import { bundleBreads, bundleDishes, bundles, bundleSauces } from '@db/schemas/bundles';
import { and, eq } from 'drizzle-orm';

import { BundleFormDto, BundleProductValue } from '@entities/bundle/types';

const compareAndUpdate = async <
  T extends { id?: number | string; quantity?: number; sortOrder?: number },
>(
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
    return match && (match.quantity !== i.quantity || match.sortOrder !== i.sortOrder);
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
            sortOrder: i.sortOrder,
          })),
        )
      : null,
    ...toUpdate.map(u =>
      db
        .update(current.table)
        .set({ quantity: u.quantity, sortOrder: u.sortOrder })
        .where(
          and(eq(current.table.bundleId, bundleId), eq(current.table[current.productIdKey], u.id)),
        ),
    ),
  ]);
};

export const updateBundleProductsDiff = async (
  bundleId: number,
  productsList: BundleFormDto['productsList'],
) => {
  // breads
  const breads = productsList.breads ?? [];
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
  const sauces = productsList.sauces ?? [];
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
  const dishes = productsList.dishes ?? [];
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
};

export const getLinkedBundlesByProduct = async (productId: number, type: BundleProductValue) => {
  let joinTable;
  let productIdKey;

  switch (type) {
    case 'bread':
      joinTable = bundleBreads;
      productIdKey = 'breadId';
      break;
    case 'sauce':
      joinTable = bundleSauces;
      productIdKey = 'sauceId';
      break;
    case 'dish':
      joinTable = bundleDishes;
      productIdKey = 'dishId';
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
