import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences, images } from '@db/schemas/image';
import { deleteImageWithItem, updateImageReference } from '@shared/api/image';
import { setSucResponseItem } from '@shared/api/response';
import { WithImageId } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { EVENT_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { EventFormDto } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: IParams) => {
  const eventId = +(await params)?.id;

  if (!eventId) {
    return NextResponse.json({ error: EVENT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(eventId)) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_ID }, { status: 400 });
  }

  let eventResult, imageResult;

  try {
    [eventResult, imageResult] = await Promise.all([
      db.select().from(events).where(eq(events.id, eventId)).limit(1),
      db
        .select({
          id: images.id,
          url: images.url,
          name: images.name,
        })
        .from(imageReferences)
        .innerJoin(images, eq(imageReferences.imageId, images.id))
        .where(
          and(
            eq(imageReferences.refTable, IMAGE_REF_VALUES.EVENT),
            eq(imageReferences.refId, eventId),
          ),
        )
        .limit(1),
    ]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: EVENT_ERRORS.GET_FAILED }, { status: 500 });
  }

  const [foundedEvent] = eventResult;
  const [eventImage] = imageResult;

  if (!foundedEvent) {
    return NextResponse.json({ error: EVENT_ERRORS.NOT_FOUND_EVENT }, { status: 400 });
  }

  const response = {
    ...foundedEvent,
    imageFiles: [eventImage],
  };

  return NextResponse.json(setSucResponseItem(response));
});

export const PUT = withAuth(async (request: NextRequest, { params }: IParams) => {
  const eventId = +(await params)?.id;

  if (!eventId) {
    return NextResponse.json({ error: EVENT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(eventId)) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_ID }, { status: 400 });
  }

  const body = (await request.json()) as Partial<WithImageId<EventFormDto>>;
  const imageId = body?.imageId;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_ID }, { status: 400 });
  }

  const { name, description, startDate, endDate, sortOrder, isHidden } = body;

  const _startDate = dayjs(startDate);
  const _endDate = dayjs(endDate);

  if (!_startDate.isValid() || !_endDate.isValid()) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_DATE }, { status: 400 });
  }

  if (_startDate.isAfter(_endDate)) {
    return NextResponse.json({ error: EVENT_ERRORS.OVER_DATE }, { status: 400 });
  }

  let updateEvent;

  try {
    updateEvent = await db
      .update(events)
      .set({
        name,
        description,
        startDate: _startDate.toDate(),
        endDate: _endDate.toDate(),
        sortOrder: Number(sortOrder),
        isHidden,
      })
      .where(eq(events.id, eventId))
      .returning();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: EVENT_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  try {
    await updateImageReference({
      refTable: IMAGE_REF_VALUES.EVENT,
      refId: eventId,
      imageIds: [imageId],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPDATE_IMAGE_DATAS }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(updateEvent));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: IParams) => {
  const eventId = +(await params)?.id;

  if (!eventId) {
    return NextResponse.json({ error: EVENT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(eventId)) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_ID }, { status: 400 });
  }

  try {
    const [foundedEvent] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);

    if (!foundedEvent) {
      return NextResponse.json({ error: EVENT_ERRORS.NOT_FOUND_EVENT }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: EVENT_ERRORS.GET_FAILED }, { status: 500 });
  }

  try {
    await db.delete(events).where(eq(events.id, eventId));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: EVENT_ERRORS.DELETE_FAILED }, { status: 500 });
  }

  try {
    await deleteImageWithItem({
      refTable: IMAGE_REF_VALUES.EVENT,
      refId: eventId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_DELETE_IMAGE_DATAS }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});
