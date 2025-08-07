import 'server-only';

import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { IPageParams } from '@shared/typings/commons';
import dayjs from 'dayjs';
import { and, asc, count, eq, gte } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { EVENT_CACHE_TAG, EVENT_CONTEXT } from '@entities/event/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams extends IPageParams {}

const fetchEventList = async ({ page, pageSize }: IParams) => {
  'use cache';
  cacheTag(EVENT_CACHE_TAG.GET_LIST);

  const now = dayjs().startOf('day').toDate();
  const whereClause = and(eq(events.isHidden, false), gte(events.endDate, now));

  const totalQuery = db.select({ count: count() }).from(events).where(whereClause);
  const listQuery = db
    .select({
      id: events.id,
      name: events.name,
      shortDescription: events.shortDescription,
      longDescription: events.longDescription,
      startDate: events.startDate,
      endDate: events.endDate,
      image: images.url,
    })
    .from(events)
    .leftJoin(
      imageReferences,
      and(
        eq(events.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.EVENT),
      ),
    )
    .leftJoin(images, eq(imageReferences.imageId, images.id))
    .where(whereClause)
    .orderBy(events.sortOrder, asc(events.startDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [[{ count: total }], list] = await Promise.all([totalQuery, listQuery]);

  return {
    total,
    list: list || [],
  };
};

const getEventList = (params: IParams) =>
  fetchWithCapture({
    context: EVENT_CONTEXT.GET_LIST,
    fn: fetchEventList,
    args: [params],
  });

export default getEventList;
