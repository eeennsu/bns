import 'server-only';

import { cookies } from 'next/headers';

import apiRefresh from '@features/auth/apis/refresh';

import { IMe } from '@entities/auth/types';

import { verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';

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
      const user = await apiRefresh();

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
