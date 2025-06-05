'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetEvent from '@features/event/hooks/useGetEvent';
import useModifyEvent from '@features/event/hooks/useModifyForm';
import EventForm from '@features/event/ui/admin/Form';

import { IEventItem } from '@entities/event/types';

import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminEventModifyPage: FC = () => {
  const { event, isError, isLoading } = useGetEvent();
  usePreventRefresh();

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
  const { files, form, onSubmit, setFiles } = useModifyEvent(event);

  return (
    <EventForm
      files={files}
      form={form}
      setFiles={setFiles}
      submitProps={{
        label: '수정',
        onSubmit,
      }}
    />
  );
};

export default AdminEventModifyPage;
