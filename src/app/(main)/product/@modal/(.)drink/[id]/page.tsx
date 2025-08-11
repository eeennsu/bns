import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailDrinkContent from '@app/(main)/product/drink/DetailDrinkContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDrinkModalPage: FC<IParams> = async ({ params }) => {
  const drinkId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailDrinkContent drinkId={drinkId} />
    </ModalShell>
  );
};

export default DetailDrinkModalPage;
