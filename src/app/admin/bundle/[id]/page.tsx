'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetBundle from '@features/bundle/hooks/useGetBundle';
import useModifyBundle from '@features/bundle/hooks/useModifyBundleForm';
import BundleForm from '@features/bundle/ui/admin/Form';

import { IBundleItem } from '@entities/bundle/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminBundleModifyPage: FC = () => {
  const { bundle, isError, isLoading } = useGetBundle();

  usePreventRefresh();
  useConfirmBeforeBack();

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
  const { files, form, onSubmit, setFiles } = useModifyBundle(bundle);

  return (
    <BundleForm
      files={files}
      form={form}
      setFiles={setFiles}
      submitProps={{
        label: '수정',
        onSubmit,
      }}
      isModify
    />
  );
};

export default AdminBundleModifyPage;
