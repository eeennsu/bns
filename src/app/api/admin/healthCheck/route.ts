import { NextResponse } from 'next/server';
import { withAuth } from 'src/shared/api/withAuth';

export const GET = withAuth(async () => {
  return NextResponse.json({ helloWorld: true });
});
