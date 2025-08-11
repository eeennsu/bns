import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailBreadContent from '@app/(main)/product/bread/DetailBreadContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadModalPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailBreadContent breadId={breadId} />
    </ModalShell>
  );
};

export default DetailBreadModalPage;
