import { FC } from 'react';

import DetailSauceContent from '@app/(main)/product/sauce/DetailSauceContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSauceModalPage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params).id;

  return <DetailSauceContent sauceId={sauceId} />;
};

export default DetailSauceModalPage;
