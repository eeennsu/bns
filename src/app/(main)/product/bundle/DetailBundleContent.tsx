import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getBundle from '@features/bundle/actions/getBundle';
import DetailBundle from '@features/bundle/ui/detail/Detail';

interface IProps {
  bundleId: string;
}

const DetailBundleContent: FC<IProps> = async ({ bundleId }) => {
  const [error, bundle] = await getBundle({ id: +bundleId });
  return error ? <ErrorMessage /> : <DetailBundle bundle={bundle} />;
};

export default DetailBundleContent;
