import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getDrink from '@features/drink/queries/getDrink';
import DetailDrink from '@features/drink/ui/detail/Detail';

interface IProps {
  drinkId: string;
}

const DetailDrinkContent: FC<IProps> = async ({ drinkId }) => {
  const [error, drink] = await getDrink({ id: +drinkId });
  return error ? <ErrorMessage /> : <DetailDrink drink={drink} />;
};

export default DetailDrinkContent;
