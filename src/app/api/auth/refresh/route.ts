import { NextRequest, NextResponse } from 'next/server';
import { setAccessTokenCookie } from 'src/shared/api/auth';
import { TOKEN_TYPE } from 'src/shared/api/consts';
import { handleRefresh } from 'src/shared/api/handleRefresh';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

export const POST = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(TOKEN_TYPE.REFRESH)?.value;

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL(MAIN_PATHS.home(), request.url));
    response.cookies.delete(TOKEN_TYPE.REFRESH);
    response.cookies.delete(TOKEN_TYPE.ACCESS);
    return response;
  }

  const { user, accessToken, error } = handleRefresh(refreshToken);

  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  if (!user || !accessToken) {
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }

  const response = NextResponse.json({
    ok: true,
    id: user.id,
    username: user.username,
    role: user.role,
  });

  setAccessTokenCookie(response, accessToken);

  return response;
};
