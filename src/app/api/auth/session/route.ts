import { NextResponse } from 'next/server';
import { ADMIN_ERRORS } from 'src/shared/api/errorMessage';
import { getServerSession } from 'src/shared/api/getServerSession';

export const GET = async () => {
  const { user: session } = await getServerSession();

  if (session) {
    return NextResponse.json({
      user: { username: session.username },
      isAuthenticated: session?.isAuthenticated,
      isAuthorized: session?.isAuthenticated && session?.role === 'admin',
    });
  }

  return NextResponse.json({ error: ADMIN_ERRORS.MISSING_ACCESS_TOKEN }, { status: 401 });
};
