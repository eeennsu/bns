'use client';

import type { FC } from 'react';

import useCreateEventForm from '@features/event/hooks/useCreateForm';
import EventForm from '@features/event/ui/admin/Form';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminEventCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateEventForm();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <PageContainer>
      <EventForm
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

export default AdminEventCreatePage;
