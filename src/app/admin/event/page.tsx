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
import useDeleteEventListItem from '@features/event/hooks/useDeleteListItem';
import useGetEventList from '@features/event/hooks/useGetList';
import { getOrderBy, setOrderBy } from '@features/event/libs/sortOrder';

import { EVENT_TABLE_HEADERS, ORDER_BY_SELECT } from '@entities/event/consts';
import { IEventItem } from '@entities/event/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminEventListPage: FC = () => {
  const router = useRouter();

  const { searchParams, setOrderByParams } = useCustomSearchParams();
  const orderBy = searchParams.get(SEARCH_PARAMS_KEYS.ORDER_BY) || getOrderBy(ORDER_BY_SELECT[0]);

  const { data, isLoading } = useGetEventList({ orderBy });

  const setOrderByEvent = (value: string) => {
    setOrderByParams(getOrderBy(value));
  };

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyEvent = (event: IEventItem) => () => {
    if (!event?.id) return;
    router.push(ADMIN_PATHS.event.detail({ slug: event?.id }));
  };

  const onClickCreateEvent = () => {
    router.push(ADMIN_PATHS.event.create());
  };

  const { isDeletePending, onDelete } = useDeleteEventListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='이벤트 이름을 입력해주세요'
        orderSelectList={ORDER_BY_SELECT}
        orderBy={setOrderBy(orderBy as OrderByType)}
        setOrderBy={setOrderByEvent}
      />
      <Table<IEventItem>
        headers={EVENT_TABLE_HEADERS}
        items={data?.items}
        showItems={['sortOrder', 'name', 'startDate', 'endDate', 'createdAt', 'isHidden', 'delete']}
        onClickItem={onClickModifyEvent}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'delete',
            children: event => (
              <DeleteDialog
                onDelete={() => onDelete(event.id)}
                name={event.name}
                isLoading={isDeletePending}
              />
            ),
          },
          {
            itemKey: 'startDate',
            children: event => (
              <span onClick={onClickModifyEvent(event)} className='text-blue-500'>
                {String(event?.startDate)}
              </span>
            ),
          },
          {
            itemKey: 'endDate',
            children: event => (
              <span onClick={onClickModifyEvent(event)} className='font-semibold text-rose-500'>
                {String(event?.endDate)}
              </span>
            ),
          },
        ]}
      />
      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateEvent}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageWidget>
  );
};

export default AdminEventListPage;
