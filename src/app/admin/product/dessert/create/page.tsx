'use client';

import type { FC } from 'react';

import useCreateDessertForm from '@features/dessert/hooks/useCreateDessertForm';
import DessertForm from '@features/dessert/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminDessertCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateDessertForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <DessertForm
        form={form}
        submitProps={{
          label: '생성하기',
          onSubmit,
        }}
        files={files}
        setFiles={setFiles}
      />
    </PageContainer>
  );
};

export default AdminDessertCreatePage;
