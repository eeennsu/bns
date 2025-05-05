'use client';

import type { NextPage } from 'next';
import { useEffect } from 'react';

import ErrorLayout from '@widgets/error';

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: NextPage<IProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <ErrorLayout />;
};

export default ErrorPage;
