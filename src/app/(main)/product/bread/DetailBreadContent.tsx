import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getBread from '@features/bread/actions/getBread';
import DetailBread from '@features/bread/ui/detail/Detail';

interface IProps {
  breadId: string;
}

const DetailBreadContent: FC<IProps> = async ({ breadId }) => {
  const [error, bread] = await getBread({ id: +breadId });
  return error ? <ErrorMessage /> : <DetailBread bread={bread} />;
};

export default DetailBreadContent;
