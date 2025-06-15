'use client';

import type { FC } from 'react';

import useCreateBreadForm from '@features/bread/hooks/useCreateForm';
import BreadForm from '@features/bread/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminBreadCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateBreadForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <BreadForm
        form={form}
        files={files}
        setFiles={setFiles}
        submitProps={{
          label: '생성',
          onSubmit,
        }}
      />
    </PageContainer>
  );
};

export default AdminBreadCreatePage;
