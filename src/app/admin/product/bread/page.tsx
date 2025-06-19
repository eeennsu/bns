'use client';

import DeleteDialog from '@shared/components/DeleteDialog';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Badge, Button } from '@shadcn-ui/ui';

import ListPageWidget from '@widgets/admin/list';

import AdminPagination from '@features/admin/ui/Pagination';
import useDeleteBreadListItem from '@features/bread/hooks/useDeleteListItem';
import useGetBreadList from '@features/bread/hooks/useGetList';

import { BREAD_TABLE_HEADERS } from '@entities/bread/consts';
import { IBreadItem } from '@entities/bread/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminBreadListPage: FC = () => {
  const router = useRouter();

  const { data, isLoading } = useGetBreadList();

  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: data?.total,
  });

  const onClickModifyBread = (bread: IBreadItem) => () => {
    router.push(ADMIN_PATHS.product.bread.detail({ slug: bread?.id }));
  };

  const onClickCreateBread = () => {
    router.push(ADMIN_PATHS.product.bread.create());
  };

  const onDelete = useDeleteBreadListItem();

  return (
    <ListPageWidget>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='빵 이름을 입력해주세요'
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
          // {
          //   itemKey: 'name',
          //   children: item => (
          //     <div className='w-[100px] overflow-visible bg-blue-400 font-bold'>{item.name}</div>
          //   ),
          // },
          {
            itemKey: 'mbti',
            children: bread => <Badge variant='secondary'>{bread.mbti}</Badge>,
          },
          {
            itemKey: 'isHidden',
            children: bread => (bread.isHidden ? '비공개' : '공개'),
          },
          {
            itemKey: 'delete',
            children: bread => (
              <DeleteDialog onDelete={() => onDelete(bread.id)} name={bread.name} />
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
