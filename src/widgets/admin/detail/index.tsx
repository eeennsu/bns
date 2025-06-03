import type { FC, PropsWithChildren } from 'react';

import DetailPageLoading from '@components/DetailPageLoading';
import PageContainer from '@components/PageContainer';

interface IProps {
  isLoading: boolean;
  isError: any;
}

const DetailWidget: FC<PropsWithChildren<IProps>> = ({ isError, isLoading, children }) => {
  if (isLoading) return <DetailPageLoading />;
  if (isError) throw Error();

  return <PageContainer>{children}</PageContainer>;
};

export default DetailWidget;
