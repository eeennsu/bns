'use client';

import type { FC } from 'react';

import useCreateSauceForm from '@features/sauce/hooks/useCreateForm';
import SauceForm from '@features/sauce/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminSauceCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateSauceForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <SauceForm
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

export default AdminSauceCreatePage;
