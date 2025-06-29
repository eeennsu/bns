'use client';

import type { FC } from 'react';

import useCreateDishForm from '@features/dish/hooks/useCreateForm';
import DishForm from '@features/dish/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminDishCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateDishForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <DishForm
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

export default AdminDishCreatePage;
