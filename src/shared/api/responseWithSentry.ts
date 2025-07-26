import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

type HandleApiErrorOptions = {
  error: unknown;
  context?: string;
  payload?: Record<string, any>;
  message?: string;
  statusCode?: number;
};

export const responseWithSentry = ({
  error,
  context,
  payload = {},
  message = '서버 오류가 발생했습니다.',
  statusCode = 500,
}: HandleApiErrorOptions) => {
  Sentry.captureException(error, {
    extra: {
      context,
      ...payload,
    },
  });

  return NextResponse.json({ error: message }, { status: statusCode });
};
