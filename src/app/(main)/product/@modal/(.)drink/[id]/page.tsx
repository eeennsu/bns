import { FC } from 'react';

import DetailDrinkContent from '@app/(main)/product/drink/DetailDrinkContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDrinkModalPage: FC<IParams> = async ({ params }) => {
  const drinkId = (await params).id;

  return <DetailDrinkContent drinkId={drinkId} />;
};

export default DetailDrinkModalPage;
