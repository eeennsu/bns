import type { FC } from 'react';

import DetailDessertContent from '../DetailDessertContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDessertPage: FC<IParams> = async ({ params }) => {
  const dessertId = (await params).id;

  return <DetailDessertContent dessertId={dessertId} />;
};

export default DetailDessertPage;
