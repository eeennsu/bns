import { generateToken, verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';
import { AUTH_ERRORS } from './errorMessage';

export const handleRefresh = (refreshToken: string | undefined) => {
  if (!refreshToken) {
    return { error: AUTH_ERRORS.MISSING_REFRESH_TOKEN };
  }

  try {
    const payload = verifyToken(refreshToken);

    if (typeof payload !== 'object' || !payload?.id || !payload?.username) {
      return { error: AUTH_ERRORS.INVALID_TOKEN_PAYLOAD };
    }

    const accessToken = generateToken(
      { id: payload.id, username: payload.username, role: payload.role },
      TOKEN_TYPE.ACCESS,
    );

    return {
      user: {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      },
      accessToken,
    };
  } catch {
    return { error: AUTH_ERRORS.INVALID_REFRESH_TOKEN };
  }
};
