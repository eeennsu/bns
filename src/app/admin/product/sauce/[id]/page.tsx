'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import EventForm from '@features/event/ui/admin/Form';
import useGetSauce from '@features/sauce/hooks/useGetSauce';
import useModifySauce from '@features/sauce/hooks/useModifyForm';

import { ISauceItem } from '@entities/sauce/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminSauceModifyPage: FC = () => {
  const { sauce, isError, isLoading } = useGetSauce();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <SauceModify sauce={sauce} />
    </DetailWidget>
  );
};

interface IProps {
  sauce: ISauceItem;
}

const SauceModify: FC<IProps> = ({ sauce }) => {
  const { files, form, onSubmit, setFiles } = useModifySauce(sauce);
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

export default AdminSauceModifyPage;
