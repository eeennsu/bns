import { FC } from 'react';

import DetailSauce from '@features/sauce/ui/detail/Detail';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSauceModalPage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailSauce id={sauceId} />
    </PageModal>
  );
};

export default DetailSauceModalPage;
