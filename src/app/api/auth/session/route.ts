import { NextResponse } from 'next/server';
import { getServerSession } from 'src/shared/api/getServerSession';

export const GET = async () => {
  const session = await getServerSession();
  return NextResponse.json(session);
};
