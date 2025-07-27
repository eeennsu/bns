import { FC } from 'react';

import DetailDrinkContent from '@app/(main)/product/drink/DetailDrinkContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDrinkModalPage: FC<IParams> = async ({ params }) => {
  const drinkId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailDrinkContent drinkId={drinkId} />
    </PageModal>
  );
};

export default DetailDrinkModalPage;
