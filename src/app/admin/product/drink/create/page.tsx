'use client';

import type { FC } from 'react';

import useCreateDrinkForm from '@features/drink/hooks/useCreateDrinkForm';
import DrinkForm from '@features/drink/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminDrinkCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateDrinkForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <DrinkForm
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

export default AdminDrinkCreatePage;
