import * as Sentry from '@sentry/nextjs';
import { JWTError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import { COOKIE_KEYS } from '@shared/consts/storage';
import { NextRequest, NextResponse } from 'next/server';
import { setAccessTokenCookie } from 'src/shared/api/auth';
import { handleRefresh } from 'src/shared/api/handleRefresh';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

export const POST = async (request: NextRequest) => {
  let refreshToken;

  try {
    refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH)?.value;

    if (!refreshToken) {
      const response = NextResponse.redirect(new URL(MAIN_PATHS.home(), request.url));
      response.cookies.delete(COOKIE_KEYS.REFRESH);
      response.cookies.delete(COOKIE_KEYS.ACCESS);
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
  } catch (error) {
    const jwtError = new JWTError(error?.message || UNKNOWN_ERROR_MESSAGE);

    Sentry.captureException(jwtError, {
      extra: {
        refreshToken,
      },
    });
  }
};
