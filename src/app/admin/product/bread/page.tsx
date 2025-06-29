'use client';

import { OrderByType } from '@shared/api/typings';
import DeleteDialog from '@shared/components/DeleteDialog';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import useCustomSearchParams from '@shared/hooks/useCustomSearchParams';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Badge, Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useDeleteBreadListItem from '@features/bread/hooks/useDeleteListItem';
import useGetBreadList from '@features/bread/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/bread/libs/sortOrder';

import { BREAD_TABLE_HEADERS, ORDER_BY_SELECT } from '@entities/bread/consts';
import { IBreadItem } from '@entities/bread/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBreadListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetBreadList({ orderBy });

  const setOrderByBread = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyBread = (bread: IBreadItem) => () => {
    if (!bread?.id) return;
    router.push(ADMIN_PATHS.product.bread.detail({ slug: bread?.id }));
  };

  const onClickCreateBread = () => {
    router.push(ADMIN_PATHS.product.bread.create());
  };

  const { isDeletePending, onDelete } = useDeleteBreadListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='빵 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByBread}
      />
      <Table<IBreadItem>
        headers={BREAD_TABLE_HEADERS}
        items={data?.items}
        showItems={[
          'sortOrder',
          'name',
          'price',
          'mbti',
          'isSignature',
          'isNew',
          'createdAt',
          'isHidden',
          'delete',
        ]}
        onClickItem={onClickModifyBread}
        renderItemProps={[
          {
            itemKey: 'mbti',
            children: bread => <Badge variant='secondary'>{bread.mbti}</Badge>,
          },
          {
            itemKey: 'delete',
            children: bread => (
              <DeleteDialog onDelete={() => onDelete(bread.id)} name={bread.name} isLoading={isDeletePending} />
            ),
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
