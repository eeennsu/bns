import { FC } from 'react';

import DetailDessertContent from '@app/(main)/product/dessert/DetailDessertContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDessertModalPage: FC<IParams> = async ({ params }) => {
  const dessertId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailDessertContent dessertId={dessertId} />
    </PageModal>
  );
};

export default DetailDessertModalPage;
