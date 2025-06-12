import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { count, ilike } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { BREAD_ERRORS, IMAGE_ERRORS } from 'src/shared/api/errorMessage';
import { setSucResponseData, setSucResponseList } from 'src/shared/api/response';
import { WithImageUrls } from 'src/shared/api/typings';
import { withAuth } from 'src/shared/api/withAuth';

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
  const body = (await request.json()) as WithImageUrls<BreadFormDto>;

  const { name, description, price, mbti, sortOrder, imageUrls, isHidden, isNew, isSignature } =
    body;

  if (!imageUrls || imageUrls.length === 0) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }
  if (imageUrls.length > 1) {
    return NextResponse.json({ error: IMAGE_ERRORS.MAX_COUNT_EXCEEDED }, { status: 400 });
  }

  let newBread;
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
    const [imageRow] = await db
      .insert(images)
      .values({
        url: imageUrls[0],
      })
      .returning();

    await db.insert(imageReferences).values({
      imageId: imageRow.id,
      refTable: 'breads',
      refId: newBread.id,
      order: 1,
    });
  } catch (e) {
    console.error('Error inserting image:', e);

    return NextResponse.json({ error: IMAGE_ERRORS.IMAGE_UPLOAD_FAILED }, { status: 500 });
  }

  return NextResponse.json(setSucResponseData(newBread));
});
