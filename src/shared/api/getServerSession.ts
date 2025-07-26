import 'server-only';

import * as Sentry from '@sentry/nextjs';
import { COOKIE_KEYS } from '@shared/consts/storage';
import { cookies } from 'next/headers';

import { verifyToken } from './auth';

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.ACCESS)?.value;
  const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken);

      return {
        user: { id: user.id, username: user.username, role: user.role, isAuthenticated: true },
      };
    }

    if (refreshToken && !accessToken) {
      return { user: null };
    }

    return null;
  } catch (error) {
    if (error instanceof Error && error.message !== 'jwt expired') {
      Sentry.captureException(error);
    }
  }
};
