import { FC } from 'react';

import DetailBread from '@features/user/bread/ui/Detail';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadModalPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailBread id={breadId} />
    </PageModal>
  );
};

export default DetailBreadModalPage;
