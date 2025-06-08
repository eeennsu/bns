'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetBundle from '@features/bundle/hooks/useGetBundle';
import BundleForm from '@features/bundle/ui/admin/Form';

import { IBundleItem } from '@entities/bundle/types';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminBundleModifyPage: FC = () => {
  const { bundle, isError, isLoading } = useGetBundle();

  usePreventRefresh();
  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <BundleModify bundle={bundle} />
    </DetailWidget>
  );
};

interface IProps {
  bundle: IBundleItem;
}

const BundleModify: FC<IProps> = ({ bundle }) => {
  console.log(bundle);

  return <BundleForm />;
};

export default AdminBundleModifyPage;
