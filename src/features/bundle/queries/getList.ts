import 'server-only';

import db from '@db/index';
import { bundles } from '@db/schemas/bundles';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams } from '@shared/typings/commons';
import { and, asc, count, eq } from 'drizzle-orm';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

import { BUNDLE_CACHE_TAG, BUNDLE_CONTEXT } from '@entities/bundle/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {}

const fetchBundleList = async ({ page, pageSize }: IParams) => {
  'use cache';
  cacheTag(BUNDLE_CACHE_TAG.GET_LIST);

  const totalQuery = db.select({ count: count() }).from(bundles);
  const listQuery = await db
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
    .orderBy(asc(bundles.sortOrder), asc(bundles.price))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [_total, list] = await Promise.all([totalQuery, listQuery]);
  const total = _total?.[0]?.count;

  return {
    list: list || [],
    total: total || list?.length || 0,
  };
};

const getBundleList = (params: IParams) =>
  fetchWithCapture({
    context: BUNDLE_CONTEXT.GET_LIST,
    fn: fetchBundleList,
    args: [params],
  });

export default getBundleList;
