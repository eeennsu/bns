import { NextResponse, type NextRequest } from 'next/server';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { TOKEN_TYPE } from './shared/api/consts';

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get(TOKEN_TYPE.REFRESH)?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL(MAIN_PATHS.home(), request.url));
  }

  const response = NextResponse.next();

  return response;
};

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
