import 'server-only';

import { cookies } from 'next/headers';

import { verifyToken } from './auth';
import { TOKEN_TYPE } from './consts';

const DEFAULT_AUTH_CONTEXT = {
  user: {
    id: '',
    username: '',
    role: 'user',
    isAuthenticated: false,
  },
  shouldRefresh: false,
};

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_TYPE.ACCESS)?.value;
  const refreshToken = cookieStore.get(TOKEN_TYPE.REFRESH)?.value;

  try {
    if (accessToken) {
      const user = verifyToken(accessToken);

      return {
        user: { id: user.id, username: user.username, role: user.role, isAuthenticated: true },
        shouldRefresh: false,
      };
    }

    if (refreshToken && !accessToken) {
      return { shouldRefresh: true, user: null };
    }

    return DEFAULT_AUTH_CONTEXT;
  } catch (error) {
    console.error('getServerSession error : ', error);
    throw error;
  }
};
