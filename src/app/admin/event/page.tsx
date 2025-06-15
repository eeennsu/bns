'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useGetEventList from '@features/event/hooks/useGetList';

import { EVENT_TABLE_HEADERS } from '@entities/event/consts';
import { IEventItem } from '@entities/event/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminEventListPage: FC = () => {
  const router = useRouter();

  const { data, isLoading } = useGetEventList();

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 10,
  });

  const onClickModifyEvent = (event: IEventItem) => () => {
    router.push(ADMIN_PATHS.event.detail({ slug: event?.id }));
  };

  const onClickCreateEvent = () => {
    router.push(ADMIN_PATHS.event.create());
  };

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='이벤트 이름을 입력해주세요'
      />
      <Table<IEventItem>
        headers={EVENT_TABLE_HEADERS}
        items={data?.items || DUMMY_EVENTS}
        showItems={['sortOrder', 'name', 'startDate', 'endDate', 'isHidden']}
        onClickItem={onClickModifyEvent}
        isLoading={isLoading}
        renderItemProps={[
          {
            itemKey: 'isHidden',
            children: event => (event.isHidden ? '비공개' : '공개'),
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

const DUMMY_EVENTS: IEventItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: '이벤트 이름',
  description: '이벤트 설명',
  sortOrder: index + 1,
  isHidden: false,
  createdAt: new Date('2025-04-03').toISOString(),
  updatedAt: new Date('2025-04-04').toISOString(),
  deletedAt: null,
  startDate: new Date('2025-04-03').toISOString(),
  endDate: new Date('2025-05-04').toISOString(),
  imageFiles: [
    {
      id: '1',
      url: 'https://picsum.photos/200/300',
      createdAt: new Date('2025-04-03').toISOString(),
      name: '이미지 이름',
      size: 1024,
      type: 'image/jpeg',
      order: index + 1,
      previewUrl: 'https://picsum.photos/200/300',
    },
  ],
}));
