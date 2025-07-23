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
import useDeleteDessertListItem from '@features/dessert/hooks/useDeleteListItem';
import useGetDessertList from '@features/dessert/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/dessert/libs/sortOrder';

import { ORDER_BY_SELECT, DESSERT_TABLE_HEADERS } from '@entities/dessert/consts';
import { IDessertItem } from '@entities/dessert/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminDessertListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetDessertList({ orderBy });

  const setOrderByDessert = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyDessert = (dessert: IDessertItem) => () => {
    if (!dessert?.id) return;
    router.push(ADMIN_PATHS.product.dessert.detail({ slug: dessert?.id }));
  };

  const onClickCreateDessert = () => {
    router.push(ADMIN_PATHS.product.dessert.create());
  };

  const { isDeletePending, onDelete } = useDeleteDessertListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='소스 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByDessert}
      />
      <Table<IDessertItem>
        headers={DESSERT_TABLE_HEADERS}
        items={data?.items}
        showItems={[
          'sortOrder',
          'name',
          'price',
          'isSignature',
          'isNew',
          'createdAt',
          'isHidden',
          'delete',
        ]}
        onClickItem={onClickModifyDessert}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: dessert => (
              <DeleteDialog
                onDelete={() => onDelete(dessert.id)}
                name={dessert.name}
                isLoading={isDeletePending}
              />
            ),
          },
        ]}
      />
      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateDessert}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminDessertListPage;
