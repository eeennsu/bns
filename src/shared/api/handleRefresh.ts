import * as Sentry from '@sentry/nextjs';
import { JWTError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import { COOKIE_KEYS } from '@shared/consts/storage';

import { generateToken, verifyToken } from './auth';
import { AUTH_ERRORS } from './errorMessage';

export const handleRefresh = (refreshToken: string | undefined) => {
  if (!refreshToken) {
    return { error: AUTH_ERRORS.MISSING_REFRESH_TOKEN };
  }

  let payload;

  try {
    payload = verifyToken(refreshToken);

    if (typeof payload !== 'object' || !payload?.id || !payload?.username) {
      return { error: AUTH_ERRORS.INVALID_TOKEN_PAYLOAD };
    }

    const accessToken = generateToken(
      { id: payload.id, username: payload.username, role: payload.role },
      COOKIE_KEYS.ACCESS,
    );

    return {
      user: {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      },
      accessToken,
    };
  } catch (error) {
    const jwtError = new JWTError(error?.message || UNKNOWN_ERROR_MESSAGE);

    Sentry.captureException(jwtError, {
      extra: {
        refreshToken,
        payload,
      },
    });

    return { error: AUTH_ERRORS.INVALID_REFRESH_TOKEN };
  }
};
