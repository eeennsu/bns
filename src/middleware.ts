import { NextResponse, type NextRequest } from 'next/server';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL(USER_PATHS.home(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
