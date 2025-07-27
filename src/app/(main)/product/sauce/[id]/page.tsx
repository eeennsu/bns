import type { FC } from 'react';

import DetailSauceContent from '../DetailSauceContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSaucePage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params).id;

  return <DetailSauceContent sauceId={sauceId} />;
};

export default DetailSaucePage;
