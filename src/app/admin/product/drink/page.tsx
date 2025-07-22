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
import useDeleteDrinkListItem from '@features/drink/hooks/useDeleteListItem';
import useGetDrinkList from '@features/drink/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/drink/libs/sortOrder';

import { ORDER_BY_SELECT, DRINK_TABLE_HEADERS } from '@entities/drink/consts';
import { IDrinkItem } from '@entities/drink/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminDrinkListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetDrinkList({ orderBy });

  const setOrderByDrink = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyDrink = (drink: IDrinkItem) => () => {
    if (!drink?.id) return;
    router.push(ADMIN_PATHS.product.drink.detail({ slug: drink?.id }));
  };

  const onClickCreateDrink = () => {
    router.push(ADMIN_PATHS.product.drink.create());
  };

  const { isDeletePending, onDelete } = useDeleteDrinkListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='소스 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByDrink}
      />
      <Table<IDrinkItem>
        headers={DRINK_TABLE_HEADERS}
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
        onClickItem={onClickModifyDrink}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: drink => (
              <DeleteDialog
                onDelete={() => onDelete(drink.id)}
                name={drink.name}
                isLoading={isDeletePending}
              />
            ),
          },
        ]}
      />
      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateDrink}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminDrinkListPage;
