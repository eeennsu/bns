'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetBread from '@features/bread/hooks/useGetBread';
import useModifyBread from '@features/bread/hooks/useModifyBread';
import BreadForm from '@features/bread/ui/admin/Form';

import { IBreadItem } from '@entities/bread/types';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminBreadModifyPage: FC = () => {
  const { bread, isError, isLoading } = useGetBread();
  usePreventRefresh();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <BreadModify bread={bread} />
    </DetailWidget>
  );
};

interface IProps {
  bread: IBreadItem;
}

const BreadModify: FC<IProps> = ({ bread }) => {
  const { form, onSubmit, files, setFiles } = useModifyBread(bread);

  return (
    <BreadForm
      form={form}
      submitProps={{
        label: '수정',
        onSubmit,
      }}
      files={files}
      setFiles={setFiles}
    />
  );
};

export default AdminBreadModifyPage;
