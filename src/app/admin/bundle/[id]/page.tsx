'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminBundleModifyPage: FC = () => {
  usePreventRefresh();
  return <div></div>;
};

export default AdminBundleModifyPage;
