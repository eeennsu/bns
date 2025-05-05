'use client';

import type { NextPage } from 'next';
import { useEffect } from 'react';

import ErrorLayout from '@widgets/error';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage: NextPage<Props> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <ErrorLayout error={error} reset={reset} />;
};

export default ErrorPage;
