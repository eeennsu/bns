'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminEventModifyPage: FC = () => {
  usePreventRefresh();
  return <div></div>;
};

export default AdminEventModifyPage;
