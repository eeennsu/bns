import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { desserts } from '@db/schemas/desserts';
import { dishes } from '@db/schemas/dishes';
import { drinks } from '@db/schemas/drinks';
import { images, imageReferences } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { actionWithCapture } from '@shared/libs/serverAction';
import { and, asc, eq } from 'drizzle-orm';

import { BundleProductValue } from '@entities/bundle/types';
import { ISignatureProduct } from '@entities/home/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

type SignatureTable = {
  table: typeof breads | typeof desserts | typeof dishes | typeof drinks | typeof sauces;
  refValue: (typeof IMAGE_REF_VALUES)[keyof typeof IMAGE_REF_VALUES];
  type: BundleProductValue;
};

const signatureTables: SignatureTable[] = [
  { table: breads, refValue: IMAGE_REF_VALUES.BREAD, type: 'bread' },
  { table: sauces, refValue: IMAGE_REF_VALUES.SAUCE, type: 'sauce' },
  { table: dishes, refValue: IMAGE_REF_VALUES.DISH, type: 'dish' },
  { table: drinks, refValue: IMAGE_REF_VALUES.DRINK, type: 'drink' },
  { table: desserts, refValue: IMAGE_REF_VALUES.DESSERT, type: 'dessert' },
] as const;

const fetchSignatureByTable = async (
  table: SignatureTable['table'],
  refValue: SignatureTable['refValue'],
  type: BundleProductValue,
) => {
  const rows = await db
    .select({
      id: table.id,
      name: table.name,
      description: table.description,
      image: images.url,
    })
    .from(table)
    .leftJoin(
      imageReferences,
      and(eq(table.id, imageReferences.refId), eq(imageReferences.refTable, refValue)),
    )
    .leftJoin(images, eq(imageReferences.imageId, images.id))
    .where(and(eq(table.isSignature, true), eq(table.isHidden, false)))
    .orderBy(asc(table.sortOrder));

  return rows.map(row => ({ ...row, type }));
};

const fetchSignatureList = async (): Promise<ISignatureProduct[]> => {
  const results = await Promise.all(
    signatureTables.map(({ table, refValue, type }) =>
      fetchSignatureByTable(table, refValue, type),
    ),
  );

  return results.flat();
};

const getSignatureList = () =>
  actionWithCapture({
    context: 'GET_SIGNATURE_LIST',
    fn: fetchSignatureList,
    args: [],
  });

export default getSignatureList;
