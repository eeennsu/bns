'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetDessert from '@features/dessert/hooks/useGetDessert';
import useModifyDessert from '@features/dessert/hooks/useModifyDessertForm';
import DessertForm from '@features/dessert/ui/admin/Form';

import { IDessertItem } from '@entities/dessert/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminDessertModifyPage: FC = () => {
  const { dessert, isError, isLoading } = useGetDessert();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <DessertModify dessert={dessert} />
    </DetailWidget>
  );
};

interface IProps {
  dessert: IDessertItem;
}

const DessertModify: FC<IProps> = ({ dessert }) => {
  const { form, onSubmit, files, setFiles } = useModifyDessert(dessert);

  return (
    <DessertForm
      form={form}
      submitProps={{
        label: '수정하기',
        onSubmit,
      }}
      files={files}
      setFiles={setFiles}
    />
  );
};

export default AdminDessertModifyPage;
