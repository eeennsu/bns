import { NextResponse } from 'next/server';
import { ADMIN_ERRORS } from 'src/shared/api/errorMessage';
import { getServerSession } from 'src/shared/api/getServerSession';

export const GET = async () => {
  const sessionResponse = await getServerSession();
  const user = sessionResponse?.user;

  if (user) {
    return NextResponse.json({
      user: { username: user.username },
      isAuthenticated: user?.isAuthenticated,
      isAuthorized: user?.isAuthenticated && user?.role === 'admin',
    });
  }

  if (user === null) {
    return NextResponse.json({ error: ADMIN_ERRORS.MISSING_ACCESS_TOKEN }, { status: 401 });
  }

  return NextResponse.json({ error: ADMIN_ERRORS.UNAUTHORIZED }, { status: 401 });
};
