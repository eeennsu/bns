import 'server-only';

import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';

import { EVENT_CACHE_TAG, EVENT_CONTEXT } from '@entities/event/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchEvent = async ({ id }: IParams) => {
  'use cache';
  cacheTag(`${EVENT_CACHE_TAG.GET}:${id}`);

  const eventQuery = await db
    .select({
      id: events.id,
      name: events.name,
      longDescription: events.longDescription,
      startDate: events.startDate,
      endDate: events.endDate,
      image: images.url,
    })
    .from(events)
    .innerJoin(
      imageReferences,
      and(
        eq(events.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.EVENT),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(events.id, id))
    .limit(1);

  return eventQuery.at(0);
};

const getEvent = (params: IParams) =>
  fetchWithCapture({
    context: EVENT_CONTEXT.GET,
    fn: fetchEvent,
    args: [params],
  });

export default getEvent;
