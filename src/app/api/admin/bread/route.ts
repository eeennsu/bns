import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences } from '@db/schemas/image';
import { setSucResponseData, setSucResponseList } from '@shared/api/response';
import { withAuth } from '@shared/api/withAuth';
import { and, count, eq, ilike, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { WithImageId } from 'src/shared/api/typings';

import { BreadFormDto } from '@entities/bread/types';

import { PER_PAGE_SIZE } from '@consts/commons';

export const GET = withAuth(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || PER_PAGE_SIZE.DEFAULT;
  const search = searchParams.get('search') || '';

  const offset = (page - 1) * pageSize;

  const whereClause = search ? ilike(breads.name, `%${search}%`) : undefined;

  const findBreads = await db.select().from(breads).limit(pageSize).offset(offset);

  const [total] = await db.select({ count: count() }).from(breads).where(whereClause);

  return NextResponse.json(
    setSucResponseList({
      list: findBreads,
      totalCount: total.count,
      page,
    }),
  );
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageId<BreadFormDto>;

  const { name, description, price, mbti, sortOrder, imageId, isHidden, isNew, isSignature } = body;

  let newBread;

  if (!imageId) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  try {
    [newBread] = await db
      .insert(breads)
      .values({
        name,
        description,
        price: Number(price),
        mbti,
        sortOrder: Number(sortOrder),
        isSignature,
        isNew,
        isHidden,
      })
      .returning();
  } catch (e) {
    console.error('Error inserting bread:', e);
    return NextResponse.json({ error: BREAD_ERRORS.CREATE_FAILED }, { status: 500 });
  }

  try {
    await db
      .update(imageReferences)
      .set({
        refId: newBread.id,
      })
      .where(
        and(
          eq(imageReferences.imageId, imageId),
          eq(imageReferences.refTable, 'bread'),
          isNull(imageReferences.refId),
        ),
      );
  } catch (e) {
    console.error('Error inserting image:', e);

    return NextResponse.json({ error: IMAGE_ERRORS.FAILED_UPLOAD }, { status: 500 });
  }

  return NextResponse.json(setSucResponseData(newBread));
});
