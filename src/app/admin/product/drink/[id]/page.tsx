'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetDrink from '@features/drink/hooks/useGetDrink';
import useModifyDrink from '@features/drink/hooks/useModifyDrinkForm';
import DrinkForm from '@features/drink/ui/admin/Form';

import { IDrinkItem } from '@entities/drink/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminDrinkModifyPage: FC = () => {
  const { drink, isError, isLoading } = useGetDrink();

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget isError={isError} isLoading={isLoading}>
      <DrinkModify drink={drink} />
    </DetailWidget>
  );
};

interface IProps {
  drink: IDrinkItem;
}

const DrinkModify: FC<IProps> = ({ drink }) => {
  const { form, onSubmit, files, setFiles } = useModifyDrink(drink);

  return (
    <DrinkForm
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

export default AdminDrinkModifyPage;
