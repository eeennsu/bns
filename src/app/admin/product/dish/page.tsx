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
import useDeleteDishListItem from '@features/dish/hooks/useDeleteListItem';
import useGetDishList from '@features/dish/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/dish/libs/sortOrder';

import { ORDER_BY_SELECT, DISH_TABLE_HEADERS } from '@entities/dish/consts';
import { IDishItem } from '@entities/dish/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminDishListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetDishList({ orderBy });

  const setOrderByDish = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyDish = (dish: IDishItem) => () => {
    if (!dish?.id) return;
    router.push(ADMIN_PATHS.product.dish.detail({ slug: dish?.id }));
  };

  const onClickCreateDish = () => {
    router.push(ADMIN_PATHS.product.dish.create());
  };

  const { isDeletePending, onDelete } = useDeleteDishListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='디쉬 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByDish}
      />
      <Table<IDishItem>
        headers={DISH_TABLE_HEADERS}
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
        onClickItem={onClickModifyDish}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: bread => (
              <DeleteDialog
                onDelete={() => onDelete(bread.id)}
                name={bread.name}
                isLoading={isDeletePending}
              />
            ),
          },
        ]}
      />
      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateDish}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminDishListPage;
