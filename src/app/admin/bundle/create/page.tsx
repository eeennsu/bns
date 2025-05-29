import type { FC } from 'react';

import BreadForm from '@features/bread/ui/admin/Form';

import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminBundleCreatePage: FC = () => {
  usePreventRefresh();
  return (
    <PageContainer>
      <BreadForm />
    </PageContainer>
  );
};

export default AdminBundleCreatePage;
