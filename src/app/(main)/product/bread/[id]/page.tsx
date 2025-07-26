import type { FC } from 'react';

import DetailBreadContent from '../DetailBreadContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params)?.id || '';

  return <DetailBreadContent breadId={breadId} />;
};

export default DetailBreadPage;
