import type { FC } from 'react';

import DetailDishContent from '../DetailDishContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDishPage: FC<IParams> = async ({ params }) => {
  const dishId = (await params).id;

  return <DetailDishContent dishId={dishId} />;
};

export default DetailDishPage;
