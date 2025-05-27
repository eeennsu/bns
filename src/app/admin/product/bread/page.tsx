'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import ListPageContainer from '@widgets/admin/Containers/ListPageContainer';

import AdminPagination from '@features/admin/ui/Pagination';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBreadListPage: FC = () => {
  const router = useRouter();
  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 45,
  });

  const onClickModifyBread = (bread: IBreadItem) => () => {
    router.push(ADMIN_PATHS.product.bread.detail({ slug: bread?.id }));
  };

  return (
    <ListPageContainer>
      <TableSearch {...searchForm} total={paginationData.total} />
      <Table<IBreadItem>
        headers={['순서', '빵 이름', '가격', 'MBTI']}
        items={DummyBreads}
        showItems={['sortOrder', 'name', 'price', 'mbti']}
        onClickItem={onClickModifyBread}
      />

      <AdminPagination {...paginationData} />
    </ListPageContainer>
  );
};

export default AdminBreadListPage;

interface IBreadItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  mbti: string;
  isSigniture: boolean;
  isNew: boolean;
  sortOrder: number;
}

const DummyBreads: IBreadItem[] = Array.from({ length: 45 }, (_, index) => ({
  id: index + 1,
  name: '메론 빵',
  description: '빵 설명',
  image: 'https://picsum.photos/id/63/350/256',
  price: 12000,
  mbti: 'ENTP',
  isSigniture: true,
  isNew: true,
  sortOrder: index + 1,
}));
