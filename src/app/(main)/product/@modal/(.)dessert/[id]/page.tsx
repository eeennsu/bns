import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailDessertContent from '@app/(main)/product/dessert/DetailDessertContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDessertModalPage: FC<IParams> = async ({ params }) => {
  const dessertId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailDessertContent dessertId={dessertId} />
    </ModalShell>
  );
};

export default DetailDessertModalPage;
