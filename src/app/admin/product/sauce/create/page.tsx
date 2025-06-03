'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminSauceCreatePage: FC = () => {
  usePreventRefresh();
  return <div></div>;
};

export default AdminSauceCreatePage;
