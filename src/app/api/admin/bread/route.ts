import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { count, ilike } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'src/shared/api/withAuth';

import { PER_PAGE_SIZE } from '@consts/commons';

export const GET = withAuth(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || PER_PAGE_SIZE.DEFAULT;
  const search = searchParams.get('search') || '';

  const offset = (page - 1) * pageSize;

  const whereClause = search ? ilike(breads.name, `%${search}%`) : undefined;

  const findBreads = await db
    .select()
    .from(breads)
    .limit(pageSize)
    .offset(offset);

  const [total] = await db.select({ count: count() }).from(breads).where(whereClause);

  return NextResponse.json({
    ok: true,
    data: {
      list: findBreads,
      totalCount: total.count,
      page,
    },
  });
});
