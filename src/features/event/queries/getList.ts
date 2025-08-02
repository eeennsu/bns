import 'server-only';

import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences, images } from '@db/schemas/image';
import { fetchWithCapture } from '@shared/api/fetchWithCapture';
import { and, asc, eq, gte } from 'drizzle-orm';

import { EVENT_CONTEXT } from '@entities/event/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

const fetchEventList = async () => {
  const listQuery = await db
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
    .where(and(eq(events.isHidden, false), gte(events.endDate, new Date())))
    .orderBy(events.sortOrder, asc(events.startDate));

  return {
    list: listQuery || [],
  };
};

const getEventList = () =>
  fetchWithCapture({
    context: EVENT_CONTEXT.GET_LIST,
    fn: fetchEventList,
    args: [],
  });

export default getEventList;
