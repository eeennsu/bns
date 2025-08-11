import type { FC } from 'react';

import DetailDrinkContent from '../DetailDrinkContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDrinkPage: FC<IParams> = async ({ params }) => {
  const drinkId = (await params)?.id || '';

  return <DetailDrinkContent drinkId={drinkId} />;
};

export default DetailDrinkPage;
