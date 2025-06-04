'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useGetSauceList from '@features/sauce/hooks/useGetList';

import { SAUCE_TABLE_HEADERS } from '@entities/sauce/consts';
import { ISauceItem } from '@entities/sauce/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminSauceListPage: FC = () => {
  const router = useRouter();

  const { data, isLoading } = useGetSauceList();
  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 10,
  });

  const onClickModifySauce = (sauce: ISauceItem) => () => {
    router.push(ADMIN_PATHS.product.sauce.detail({ slug: sauce?.id }));
  };

  const onClickCreateSauce = () => {
    router.push(ADMIN_PATHS.product.sauce.create());
  };

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='소스 이름을 입력해주세요'
      />
      <Table<ISauceItem>
        headers={SAUCE_TABLE_HEADERS}
        items={data?.items || DUMMY_SAUCES}
        showItems={[
          'sortOrder',
          'name',
          'price',
          'isSignature',
          'isNew',
          'isHidden',
          'createdAt',
          'updatedAt',
        ]}
        onClickItem={onClickModifySauce}
        isLoading={isLoading}
      />

      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateSauce}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminSauceListPage;

const DUMMY_SAUCES: ISauceItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: '메론 소스',
  description: '소스 설명',
  image: 'https://picsum.photos/id/63/350/256',
  price: 12000,
  isSigniture: true,
  isNew: true,
  sortOrder: index + 1,
  createdAt: new Date('2025-04-03').toISOString(),
  updatedAt: new Date('2025-04-04').toISOString(),
  deletedAt: null,
  isHidden: !false,
  isSignature: true,
  imageFile: {
    id: '1',
    key: '1',
    name: '1',
    type: '1',
    url: '1',
    lastModified: 1,
    size: 1,
  },
}));
