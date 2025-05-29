'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageContainer from '@widgets/admin/Containers/ListPageContainer';

import AdminPagination from '@features/admin/ui/Pagination';

import { IBreadItem } from '@entities/bread/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBreadListPage: FC = () => {
  const router = useRouter();
  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 10,
  });

  const onClickModifyBread = (bread: IBreadItem) => () => {
    router.push(ADMIN_PATHS.product.bread.detail({ slug: bread?.id }));
  };

  const onClickCreateBread = () => {
    router.push(ADMIN_PATHS.product.bread.create());
  };

  return (
    <ListPageContainer>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='빵 이름을 입력해주세요'
      />
      <Table<IBreadItem>
        headers={['순서', '빵 이름', '가격', 'MBTI']}
        items={DummyBreads}
        showItems={['sortOrder', 'name', 'price', 'mbti']}
        onClickItem={onClickModifyBread}
      />

      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateBread}>
          <Plus />
          신규 등록
        </Button>
      </BottomRightWrapper>
    </ListPageContainer>
  );
};

export default AdminBreadListPage;

const DummyBreads: IBreadItem[] = Array.from({ length: 10 }, (_, index) => ({
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
