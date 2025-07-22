'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetDish from '@features/dish/hooks/useGetDish';
import useModifyDish from '@features/dish/hooks/useModifyDishForm';
import DishForm from '@features/dish/ui/admin/Form';

import { IDishItem } from '@entities/dish/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminDishModifyPage: FC = () => {
  const { dish, isError, isLoading } = useGetDish();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <DishModify dish={dish} />
    </DetailWidget>
  );
};

interface IProps {
  dish: IDishItem;
}

const DishModify: FC<IProps> = ({ dish }) => {
  const { form, onSubmit, files, setFiles } = useModifyDish(dish);

  return (
    <DishForm
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

export default AdminDishModifyPage;
