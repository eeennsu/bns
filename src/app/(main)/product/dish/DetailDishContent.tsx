import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getDish from '@features/dish/queries/getDish';
import DetailDish from '@features/dish/ui/detail/Detail';

interface IProps {
  dishId: string;
}

const DetailDishContent: FC<IProps> = async ({ dishId }) => {
  const [error, dish] = await getDish({ id: +dishId });
  return error ? <ErrorMessage /> : <DetailDish dish={dish} />;
};

export default DetailDishContent;
