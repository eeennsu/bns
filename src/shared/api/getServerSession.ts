import 'server-only';

import { cookies } from 'next/headers';

import { IMe } from '@entities/auth/types';

import { verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';
import { AUTH_ERRORS } from './errorResponse';

const DEFAULT_AUTH_CONTEXT: IMe = {
  id: '',
  username: '',
  role: 'user',
  isAuthenticated: false,
};

export const getServerSession = async (): Promise<IMe> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_TYPE.ACCESS)?.value;
  const refreshToken = cookieStore.get(TOKEN_TYPE.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken);

      return {
        id: user.id,
        username: user.username,
        role: user.role,
        isAuthenticated: true,
      };
    }

    if (refreshToken && !accessToken) {
      const user = await serverRefresh();

      if (!user) {
        return DEFAULT_AUTH_CONTEXT;
      }

      return {
        id: user.id,
        username: user.username,
        role: user.role,
        isAuthenticated: true,
      };
    }

    return DEFAULT_AUTH_CONTEXT;
  } catch (error) {
    console.error('getServerSession error : ', error);
    throw error;
  }
};

export const serverRefresh = async (): Promise<IMe> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: (await cookies()).toString(),
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!response.ok) throw new Error(AUTH_ERRORS.REFRESH_FAILED);

  const user = await response.json();

  return {
    id: user.id,
    username: user.username,
    role: user.role,
    isAuthenticated: true,
  };
};
