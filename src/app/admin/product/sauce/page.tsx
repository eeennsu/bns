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
import useDeleteSauceListItem from '@features/sauce/hooks/useDeleteListItem';
import useGetSauceList from '@features/sauce/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/sauce/libs/sortOrder';

import { ORDER_BY_SELECT, SAUCE_TABLE_HEADERS } from '@entities/sauce/consts';
import { ISauceItem } from '@entities/sauce/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminSauceListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetSauceList({ orderBy });

  const setOrderBySauce = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifySauce = (sauce: ISauceItem) => () => {
    if (!sauce?.id) return;
    router.push(ADMIN_PATHS.product.sauce.detail({ slug: sauce?.id }));
  };

  const onClickCreateSauce = () => {
    router.push(ADMIN_PATHS.product.sauce.create());
  };

  const onDelete = useDeleteSauceListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='소스 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderBySauce}
      />
      <Table<ISauceItem>
        headers={SAUCE_TABLE_HEADERS}
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
        onClickItem={onClickModifySauce}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: bread => (
              <DeleteDialog onDelete={() => onDelete(bread.id)} name={bread.name} />
            ),
          },
        ]}
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
