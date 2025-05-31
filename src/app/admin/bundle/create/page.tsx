'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminBundleCreatePage: FC = () => {
  usePreventRefresh();
  return <PageContainer></PageContainer>;
};

export default AdminBundleCreatePage;
