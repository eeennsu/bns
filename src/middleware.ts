import { verifyToken } from '@libs/auth';
import { NextResponse, type NextRequest } from 'next/server';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { TOKEN_TYPE } from './shared/api/consts';

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get(TOKEN_TYPE.ACCESS)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL(USER_PATHS.home(), request.url));
  }

  try {
    const payload = verifyToken(accessToken);

    if (typeof payload !== 'object' || !payload?.id || !payload?.username) {
      return NextResponse.redirect(new URL(USER_PATHS.home(), request.url));
    }
  } catch (error) {
    console.error('Access Token error : ', error);
    return NextResponse.redirect(new URL(USER_PATHS.home(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
