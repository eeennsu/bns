import { generateToken, setAccessTokenCookie, verifyToken } from '@libs/auth';
import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_TYPE } from 'src/shared/api/consts';
import { AUTH_ERRORS } from 'src/shared/api/errorResponse';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

export const POST = async (request: NextRequest) => {
  try {
    const refreshToken = request.cookies.get(TOKEN_TYPE.REFRESH)?.value;

    if (!refreshToken) {
      const response = NextResponse.redirect(new URL(USER_PATHS.home(), request.url));
      response.cookies.delete(TOKEN_TYPE.REFRESH);
      response.cookies.delete(TOKEN_TYPE.ACCESS);

      return response;
    }

    const payload = verifyToken(refreshToken);

    if (typeof payload !== 'object' || !payload?.id || !payload?.username) {
      return NextResponse.json({ error: AUTH_ERRORS.INVALID_TOKEN_PAYLOAD }, { status: 401 });
    }

    const accessToken = generateToken(
      { id: payload.id, username: payload.username },
      TOKEN_TYPE.ACCESS,
    );

    const response = NextResponse.json({ ok: true });
    setAccessTokenCookie(response, accessToken);

    return response;
  } catch (error) {
    console.error('Refresh Token error : ', error);
    return NextResponse.json({ error: AUTH_ERRORS.INVALID_REFRESH_TOKEN }, { status: 401 });
  }
};
