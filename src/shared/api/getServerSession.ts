import 'server-only';

import * as Sentry from '@sentry/nextjs';
import { ServerSessionError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import { COOKIE_KEYS } from '@shared/consts/storage';
import { cookies } from 'next/headers';

import { verifyToken } from './auth';

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.ACCESS)?.value;
  // const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken);

      if (!user) {
        return { user: null };
      }

      return {
        user: { id: user.id, username: user.username, role: user.role, isAuthenticated: true },
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error && error.message !== 'jwt expired') {
      const serverSessionError = new ServerSessionError(error?.message || UNKNOWN_ERROR_MESSAGE);
      Sentry.captureException(serverSessionError);
    }
  }
};
