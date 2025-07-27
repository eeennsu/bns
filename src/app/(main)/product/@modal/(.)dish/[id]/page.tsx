import { FC } from 'react';

import DetailDishContent from '@app/(main)/product/dish/DetailDishContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailDishModalPage: FC<IParams> = async ({ params }) => {
  const dishId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailDishContent dishId={dishId} />
    </PageModal>
  );
};

export default DetailDishModalPage;
