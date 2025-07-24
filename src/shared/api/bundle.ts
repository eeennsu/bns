import db from '@db/index';
import {
  bundleBreads,
  bundleDesserts,
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
  const grouped = {
    [BUNDLE_PRODUCT_TYPE.BREAD]: [],
    [BUNDLE_PRODUCT_TYPE.SAUCE]: [],
    [BUNDLE_PRODUCT_TYPE.DISH]: [],
    [BUNDLE_PRODUCT_TYPE.DRINK]: [],
    [BUNDLE_PRODUCT_TYPE.DESSERT]: [],
  };

  for (const product of products) {
    grouped[product.type]?.push(product);
  }

  const config = [
    {
      type: BUNDLE_PRODUCT_TYPE.BREAD,
      table: bundleBreads,
      idKey: 'breadId',
    },
    {
      type: BUNDLE_PRODUCT_TYPE.SAUCE,
      table: bundleSauces,
      idKey: 'sauceId',
    },
    {
      type: BUNDLE_PRODUCT_TYPE.DISH,
      table: bundleDishes,
      idKey: 'dishId',
    },
    {
      type: BUNDLE_PRODUCT_TYPE.DRINK,
      table: bundleDrinks,
      idKey: 'drinkId',
    },
    {
      type: BUNDLE_PRODUCT_TYPE.DESSERT,
      table: bundleDesserts,
      idKey: 'dessertId',
    },
  ];

  await Promise.all(
    config.map(async ({ type, table, idKey }) => {
      const existing = await db.select().from(table).where(eq(table.bundleId, bundleId));

      await compareAndUpdate(
        { idKey, table, productIdKey: idKey },
        existing,
        grouped[type],
        bundleId,
      );
    }),
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
    case BUNDLE_PRODUCT_TYPE.DESSERT:
      joinTable = bundleDesserts;
      productIdKey = 'dessertId';
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
