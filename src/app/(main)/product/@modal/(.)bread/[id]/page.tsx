import { FC } from 'react';

import DetailBreadContent from '@app/(main)/product/bread/DetailBreadContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadModalPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params)?.id || '';

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailBreadContent breadId={breadId} />
    </PageModal>
  );
};

export default DetailBreadModalPage;
