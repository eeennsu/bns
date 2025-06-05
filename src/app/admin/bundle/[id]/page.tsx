'use client';

import type { FC } from 'react';

import usePreventRefresh from '@hooks/usePreventRefresh';
import DetailWidget from '@widgets/admin/detail';

const AdminBundleModifyPage: FC = () => {
  usePreventRefresh();
  return <DetailWidget></DetailWidget>;
};

interface IProps {
  bundle: IBundleItem;
}



export default AdminBundleModifyPage;
