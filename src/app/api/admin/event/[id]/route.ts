import db from '@db/index';
import { events } from '@db/schemas/events';
import { imageReferences, images } from '@db/schemas/image';
import { defaultResponse, setSucResponseItem } from '@shared/api/response';
import { WithImageId } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { EVENT_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';

import { EventFormDto } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = withAuth(async (_: NextRequest, { params }: Params) => {
  const eventId = +(await params).id;

  if (!eventId) {
    return NextResponse.json({ error: EVENT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(eventId)) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [eventResult, imageResult] = await Promise.all([
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

export const PUT = withAuth(async (request: NextRequest, { params }: Params) => {
  const eventId = +(await params).id;

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

  const [existingImageRef] = await db
    .select({
      id: imageReferences.id,
      imageId: imageReferences.imageId,
    })
    .from(imageReferences)
    .where(
      and(eq(imageReferences.refTable, IMAGE_REF_VALUES.EVENT), eq(imageReferences.refId, eventId)),
    )
    .limit(1);

  if (existingImageRef?.imageId !== imageId) {
    if (existingImageRef) {
      await Promise.all([
        db.delete(imageReferences).where(eq(imageReferences.id, existingImageRef.id)),
        db.delete(images).where(eq(images.id, existingImageRef.imageId)),
      ]);
    }

    await db
      .update(imageReferences)
      .set({ refId: eventId })
      .where(eq(imageReferences.imageId, imageId));
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

  const updateEvent = await db
    .update(events)
    .set({
      name,
      description,
      startDate: _startDate.toDate(),
      endDate: _endDate.toDate(),
      sortOrder: Number(sortOrder),
      isHidden,
    })
    .where(eq(events.id, eventId));

  if (!updateEvent) {
    return NextResponse.json({ error: EVENT_ERRORS.MODIFY_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseItem(updateEvent));
});

export const DELETE = withAuth(async (_: NextRequest, { params }: Params) => {
  const eventId = +(await params).id;

  if (!eventId) {
    return NextResponse.json({ error: EVENT_ERRORS.MISSING_ID }, { status: 400 });
  }

  if (isNaN(eventId)) {
    return NextResponse.json({ error: EVENT_ERRORS.INVALID_ID }, { status: 400 });
  }

  const [foundedEvent] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);

  if (!foundedEvent) {
    return NextResponse.json({ error: EVENT_ERRORS.NOT_FOUND_EVENT }, { status: 400 });
  }

  const [imageRef] = await db
    .select()
    .from(imageReferences)
    .where(eq(imageReferences.refId, eventId));

  await Promise.all(
    [
      imageRef?.id ? db.delete(images).where(eq(images.id, imageRef.imageId)) : null,
      db.delete(imageReferences).where(eq(imageReferences.refId, eventId)),
      db.delete(events).where(eq(events.id, eventId)),
    ].filter(Boolean),
  );

  return NextResponse.json(defaultResponse);
});
