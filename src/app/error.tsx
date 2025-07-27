'use client';

import * as Sentry from '@sentry/nextjs';
import { ErrorPageError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import type { NextPage } from 'next';
import { useEffect } from 'react';

import ErrorLayout from '@widgets/error';

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: NextPage<IProps> = ({ error }) => {
  useEffect(() => {
    const errorPageError = new ErrorPageError(error?.message || UNKNOWN_ERROR_MESSAGE);

    Sentry.captureException(errorPageError);
  }, [error]);

  return <ErrorLayout />;
};

export default ErrorPage;
