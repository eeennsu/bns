import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailDishContent from '@app/(main)/product/dish/DetailDishContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDishModalPage: FC<IParams> = async ({ params }) => {
  const dishId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailDishContent dishId={dishId} />
    </ModalShell>
  );
};

export default DetailDishModalPage;
