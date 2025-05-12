import type { FC } from 'react';

import DetailBread from '@features/user/bread/ui/detail/Detail';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params).id;

  return <DetailBread id={breadId} />;
};

export default DetailBreadPage;
