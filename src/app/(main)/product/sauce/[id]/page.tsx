import type { FC } from 'react';

import DetailSauce from '@features/sauce/ui/detail/Detail';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSaucePage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params).id;

  return <DetailSauce id={sauceId} />;
};

export default DetailSaucePage;
