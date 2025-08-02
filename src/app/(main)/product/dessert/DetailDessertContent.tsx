import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getDessert from '@features/dessert/queries/getDessert';
import DetailDessert from '@features/dessert/ui/detail/Detail';

interface IProps {
  dessertId: string;
}

const DetailDessertContent: FC<IProps> = async ({ dessertId }) => {
  const [error, dessert] = await getDessert({ id: +dessertId });
  return error ? <ErrorMessage /> : <DetailDessert dessert={dessert} />;
};

export default DetailDessertContent;
