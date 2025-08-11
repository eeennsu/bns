import { FC } from 'react';

import ModalShell from '@app/(main)/product/ModalShell';
import DetailSauceContent from '@app/(main)/product/sauce/DetailSauceContent';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailSauceModalPage: FC<IParams> = async ({ params }) => {
  const sauceId = (await params)?.id || '';

  return (
    <ModalShell>
      <DetailSauceContent sauceId={sauceId} />
    </ModalShell>
  );
};

export default DetailSauceModalPage;
