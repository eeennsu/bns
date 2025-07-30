import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getSauce from '@features/sauce/queries/getSauce';
import DetailSauce from '@features/sauce/ui/detail/Detail';

interface IProps {
  sauceId: string;
}

const DetailSauceContent: FC<IProps> = async ({ sauceId }) => {
  const [error, sauce] = await getSauce({ id: +sauceId });
  return error ? <ErrorMessage /> : <DetailSauce sauce={sauce} />;
};

export default DetailSauceContent;
