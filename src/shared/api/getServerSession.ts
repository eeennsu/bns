import 'server-only';

import { cookies } from 'next/headers';

import apiRefresh from '@features/auth/apis/refresh';

import { IMe } from '@entities/user/types';

import { verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';
import { ITokenPayload } from './typings';

const DEFAULT_AUTH_CONTEXT: IMe = {
  isLogin: false,
  role: 'user',
};

export const getServerSession = async (): Promise<IMe> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_TYPE.ACCESS)?.value;
  const refreshToken = cookieStore.get(TOKEN_TYPE.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken) as ITokenPayload;
      return { isLogin: true, role: user.role };
    }

    if (refreshToken) {
      const user = await apiRefresh();
      return { isLogin: true, role: user.role };
    }

    return DEFAULT_AUTH_CONTEXT;
  } catch {
    return DEFAULT_AUTH_CONTEXT;
  }
};
