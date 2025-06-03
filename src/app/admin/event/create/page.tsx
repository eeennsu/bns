'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminEventCreatePage: FC = () => {
  usePreventRefresh();
  return <div></div>;
};

export default AdminEventCreatePage;
