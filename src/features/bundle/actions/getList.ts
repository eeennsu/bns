'use server';

import db from '@db/index';
import { bundles } from '@db/schemas/bundles';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { and, asc, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

const fetchBundleList = async () => {
  const bundleListQuery = await db
    .select({
      id: bundles.id,
      name: bundles.name,
      price: bundles.price,
      discountedPrice: bundles.discountedPrice,
      image: images.url,
    })
    .from(bundles)
    .leftJoin(
      imageReferences,
      and(
        eq(imageReferences.refTable, IMAGE_REF_VALUES.BUNDLE),
        eq(imageReferences.refId, bundles.id),
        eq(imageReferences.sortOrder, 1),
      ),
    )
    .leftJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(bundles.isHidden, false))
    .orderBy(asc(bundles.sortOrder), asc(imageReferences.sortOrder));

  return bundleListQuery;
};

const getBundleList = () =>
  executeWithCapture({
    context: 'GET_BUNDLE_LIST',
    fn: fetchBundleList,
    args: [],
  });

export default getBundleList;
