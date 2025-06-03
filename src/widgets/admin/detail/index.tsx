import type { FC, PropsWithChildren } from 'react';

import DetailPageLoading from '@components/DetailPageLoading';
import PageContainer from '@components/PageContainer';

interface IProps {
  isLoading: boolean;
  isError: boolean;
}

const DetailWidget: FC<PropsWithChildren<IProps>> = ({ isError, isLoading, children }) => {
  if (isLoading) return <DetailPageLoading />;

  if (isError) throw new Error('오류가 발생했습니다.');

  return <PageContainer>{children}</PageContainer>;
};

export default DetailWidget;
