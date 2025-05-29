import 'server-only';

import { cookies } from 'next/headers';

import apiRefresh from '@features/auth/apis/refresh';

import { IMe } from '@entities/user/types';

import { verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';
import { ITokenPayload } from './typings';

const DEFAULT_AUTH_CONTEXT: IMe = {
  authorization: null,
  role: 'user',
};

export const getServerSession = async (): Promise<IMe> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_TYPE.ACCESS)?.value;
  const refreshToken = cookieStore.get(TOKEN_TYPE.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken) as ITokenPayload;
      return { authorization: accessToken, role: user.role };
    }

    if (refreshToken) {
      const user = await apiRefresh();
      const cookieStore = await cookies();
      const newAccessToken = cookieStore.get(TOKEN_TYPE.ACCESS)?.value;
      return { authorization: newAccessToken, role: user.role };
    }

    return DEFAULT_AUTH_CONTEXT;
  } catch {
    return DEFAULT_AUTH_CONTEXT;
  }
};
