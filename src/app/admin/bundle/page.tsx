'use client';

import { OrderByType } from '@shared/api/typings';
import DeleteDialog from '@shared/components/DeleteDialog';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import useCustomSearchParams from '@shared/hooks/useCustomSearchParams';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useDeleteBundleListItem from '@features/bundle/hooks/useDeleteListItem';
import useGetBundleList from '@features/bundle/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/bundle/libs/sortOrder';

import { BUNDLE_TABLE_HEADERS, ORDER_BY_SELECT } from '@entities/bundle/consts';
import { IBundleItem } from '@entities/bundle/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBundleListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetBundleList({ orderBy });

  const setOrderByBundle = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyBundle = (bundle: IBundleItem) => () => {
    if (!bundle?.id) return;
    router.push(ADMIN_PATHS.bundle.detail({ slug: bundle?.id }));
  };

  const onClickCreateBundle = () => {
    router.push(ADMIN_PATHS.bundle.create());
  };

  const { isDeletePending, onDelete } = useDeleteBundleListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='세트 구성 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByBundle}
      />
      <Table<IBundleItem>
        headers={BUNDLE_TABLE_HEADERS}
        items={data?.items}
        showItems={[
          'sortOrder',
          'name',
          'price',
          'discountedPrice',
          'createdAt',
          'isHidden',
          'delete',
        ]}
        onClickItem={onClickModifyBundle}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: bundle => (
              <DeleteDialog
                onDelete={() => onDelete(bundle.id)}
                name={bundle.name}
                isLoading={isDeletePending}
              />
            ),
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
