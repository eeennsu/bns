import { FC } from 'react';

import DetailBundleContent from '@app/(main)/product/bundle/DetailBundleContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBundleModalPage: FC<IParams> = async ({ params }) => {
  const bundleId = (await params).id;

  return <DetailBundleContent bundleId={bundleId} />;
};

export default DetailBundleModalPage;
