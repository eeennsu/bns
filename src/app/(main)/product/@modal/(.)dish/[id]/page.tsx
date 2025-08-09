import { FC } from 'react';

import DetailDishContent from '@app/(main)/product/dish/DetailDishContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDishModalPage: FC<IParams> = async ({ params }) => {
  const dishId = (await params).id;

  return <DetailDishContent dishId={dishId} />;
};

export default DetailDishModalPage;
