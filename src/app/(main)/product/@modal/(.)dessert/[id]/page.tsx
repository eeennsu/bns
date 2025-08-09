import { FC } from 'react';

import DetailDessertContent from '@app/(main)/product/dessert/DetailDessertContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDessertModalPage: FC<IParams> = async ({ params }) => {
  const dessertId = (await params).id;

  return <DetailDessertContent dessertId={dessertId} />;
};

export default DetailDessertModalPage;
