import * as Sentry from '@sentry/nextjs';

export const tryCatchAction = async <T extends unknown[], U>(
  feature: string,
  fn: (...args: T) => Promise<U>,
  ...args: T
): Promise<[null, U] | [Error, U]> => {
  try {
    const result = await fn(...args);
    return [null, result];
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        feature,
      },
      extra: {
        params: args,
      },
    });

    return [error instanceof Error ? error : new Error('알 수 없는 에러가 발생했습니다.'), null];
  }
};
