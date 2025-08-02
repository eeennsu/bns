import * as Sentry from '@sentry/nextjs';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';

import { ServerActionError } from '../libs/customError';

interface IParams<T extends unknown[], U> {
  fn: (...args: T) => Promise<U>;
  args?: T;
  context: string;
}

export const fetchWithCapture = async <T extends unknown[], U>({
  fn,
  args,
  context,
}: IParams<T, U>): Promise<[undefined, U] | [ServerActionError]> => {
  try {
    const result = await fn(...args);
    return [undefined, result];
  } catch (err) {
    const serverActionError = new ServerActionError(err?.message || UNKNOWN_ERROR_MESSAGE);

    Sentry.captureException(serverActionError, {
      extra: {
        actionName: context,
        ...(args ? { payload: args } : {}),
      },
    });

    return [serverActionError];
  }
};
