import { FC } from 'react';

import DetailBreadContent from '@app/(main)/product/bread/DetailBreadContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadModalPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params)?.id || '';

  return <DetailBreadContent breadId={breadId} />;
};

export default DetailBreadModalPage;
