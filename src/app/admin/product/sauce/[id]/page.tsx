'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminSauceModifyPage: FC = () => {
  usePreventRefresh();
  return <div></div>;
};

export default AdminSauceModifyPage;
