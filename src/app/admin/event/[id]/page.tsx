'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetEvent from '@features/event/hooks/useGetEvent';
import useModifyEvent from '@features/event/hooks/useModifyEventForm';
import EventForm from '@features/event/ui/admin/Form';

import { IEventItem } from '@entities/event/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminEventModifyPage: FC = () => {
  const { event, isError, isLoading } = useGetEvent();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <EventModify event={event} />
    </DetailWidget>
  );
};

interface IProps {
  event: IEventItem;
}

const EventModify: FC<IProps> = ({ event }) => {
  const { form, onSubmit, files, setFiles } = useModifyEvent(event);

  return (
    <EventForm
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

export default AdminEventModifyPage;
