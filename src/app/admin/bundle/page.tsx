'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useGetBundleList from '@features/bundle/hooks/useGetList';

import { BUNDLE_TABLE_HEADERS } from '@entities/bundle/consts';
import { IBundleItem } from '@entities/bundle/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBundleListPage: FC = () => {
  const router = useRouter();

  const { data, isLoading } = useGetBundleList();

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 10,
  });

  const onClickModifyBundle = (bundle: IBundleItem) => () => {
    router.push(ADMIN_PATHS.bundle.detail({ slug: bundle?.id }));
  };

  const onClickCreateBundle = () => {
    router.push(ADMIN_PATHS.bundle.create());
  };

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='세트 구성 이름을 입력해주세요'
      />
      <Table<IBundleItem>
        headers={BUNDLE_TABLE_HEADERS}
        items={data?.items || DUMMY_BUNDLES}
        showItems={['sortOrder', 'name', 'price', 'discountedPrice', 'createdAt', 'isHidden']}
        onClickItem={onClickModifyBundle}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'isHidden',
            children: bundle => (bundle.isHidden ? '비공개' : '공개'),
          },
        ]}
      />

      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateBundle}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminBundleListPage;

const DUMMY_BUNDLES: IBundleItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: '엄청난 빵과 소스임',
  description: '세트 구성 설명',
  image: 'https://picsum.photos/id/63/350/256',
  price: 12000,
  discountedPrice: 10000,
  sortOrder: index + 1,
  breads: [],
  sauces: [],
  isHidden: false,
  createdAt: new Date('2025-04-03').toISOString(),
  updatedAt: new Date('2025-04-04').toISOString(),
  deletedAt: null,
  isSignature: true,
  imageFiles: [],
  productsList: [],
}));
