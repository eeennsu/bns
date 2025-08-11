import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailBundleContent from '@app/(main)/product/bundle/DetailBundleContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBundleModalPage: FC<IParams> = async ({ params }) => {
  const bundleId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailBundleContent bundleId={bundleId} />
    </ModalShell>
  );
};

export default DetailBundleModalPage;
