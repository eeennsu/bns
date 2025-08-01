import { COOKIE_KEYS } from '@shared/consts/storage';
import { NextResponse, type NextRequest } from 'next/server';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH)?.value;

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL(MAIN_PATHS.home(), request.url));
    response.cookies.set(COOKIE_KEYS.LOGIN_EXPIRED, 'true', { path: '/', httpOnly: false });

    return response;
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
