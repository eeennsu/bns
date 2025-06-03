'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Badge, Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useGetBreadList from '@features/bread/hooks/useGetList';

import { BREAD_TABLE_HEADERS } from '@entities/bread/consts';
import { IBreadItem } from '@entities/bread/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBreadListPage: FC = () => {
  const router = useRouter();

  const { data, isLoading } = useGetBreadList();

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
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='빵 이름을 입력해주세요'
      />
      <Table<IBreadItem>
        headers={BREAD_TABLE_HEADERS}
        items={data?.items || DUMMY_BREADS}
        showItems={[
          'sortOrder',
          'name',
          'price',
          'mbti',
          'isSignature',
          'isNew',
          'isHidden',
          'createdAt',
          'updatedAt',
        ]}
        onClickItem={onClickModifyBread}
        renderItemProps={[
          {
            itemKey: 'mbti',
            children: item => <Badge variant='secondary'>{item.mbti}</Badge>,
          },
        ]}
        isLoading={isLoading}
      />

      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateBread}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminBreadListPage;

const DUMMY_BREADS: IBreadItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: '메론 빵',
  description: '빵 설명',
  image: 'https://picsum.photos/id/63/350/256',
  price: 12000,
  mbti: 'ENTP',
  isSigniture: true,
  isNew: true,
  sortOrder: index + 1,
  createdAt: new Date('2025-04-03').toISOString(),
  updatedAt: new Date('2025-04-04').toISOString(),
  deletedAt: null,
  isHidden: !false,
  isSignature: true,
  imageFile: {
    imageId: '1',
    key: '1',
    name: '1',
    type: '1',
    url: '1',
    lastModified: 1,
    size: 1,
  },
}));
