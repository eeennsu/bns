import * as Sentry from '@sentry/nextjs';
import { ApiError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import { NextResponse } from 'next/server';

interface IParams {
  error: unknown;
  message: string;
  context: string;
  payload?: unknown;
  statusCode?: number;
}

export const responseWithSentry = ({
  error,
  context,
  payload = {},
  message = '알 수 없는 서버 오류가 발생했습니다.',
  statusCode = 500,
}: IParams) => {
  const apiError = new ApiError(error instanceof Error ? error?.message : UNKNOWN_ERROR_MESSAGE);
  Sentry.captureException(apiError, {
    extra: {
      apiName: context,
      payload,
    },
  });

  return NextResponse.json({ error: message }, { status: statusCode });
};
