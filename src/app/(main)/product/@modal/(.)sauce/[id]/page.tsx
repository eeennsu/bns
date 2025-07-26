import { FC } from 'react';

import DetailSauceContent from '@app/(main)/product/sauce/DetailSauceContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSauceModalPage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailSauceContent sauceId={sauceId} />
    </PageModal>
  );
};

export default DetailSauceModalPage;
