import { FC } from 'react';

import DetailBundleContent from '@app/(main)/product/bundle/DetailBundleContent';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBundleModalPage: FC<IParams> = async ({ params }) => {
  const bundleId = (await params).id;

  return (
    <PageModal className='bg-[#FFFFF0]'>
      <DetailBundleContent bundleId={bundleId} />
    </PageModal>
  );
};

export default DetailBundleModalPage;
