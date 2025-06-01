'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { Button } from '@shadcn-ui/ui';

import ListPageContainer from '@widgets/admin/Containers/ListPageContainer';

import AdminPagination from '@features/admin/ui/Pagination';

import { ISauceItem } from '@entities/sauce/types';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import BottomRightWrapper from '@components/BottomRightWrapper';
import Table from '@components/Table';
import TableSearch from '@components/TableSearch';

const AdminSauceListPage: FC = () => {
  const router = useRouter();
  const searchForm = useTableSearch();
  const paginationData = useChangePage({
    total: 10,
  });

  // const onClickModifySauce = (sauce: IBreadItem) => () => {
  //   router.push(ADMIN_PATHS.product.sauce.detail({ slug: sauce?.id }));
  // };

  const onClickCreateSauce = () => {
    router.push(ADMIN_PATHS.product.sauce.create());
  };

  return (
    <ListPageContainer>
      <TableSearch
        {...searchForm}
        total={paginationData.total}
        placeholder='빵 이름을 입력해주세요'
      />
      <Table<ISauceItem>
        headers={['순서', '이름', '가격']}
        items={[]}
        showItems={['sortOrder', 'name', 'price']}
        // onClickItem={onClickModifySauce}
      />

      <AdminPagination {...paginationData} />
      <BottomRightWrapper>
        <Button onClick={onClickCreateSauce}>
          신규 등록
          <Plus />
        </Button>
      </BottomRightWrapper>
    </ListPageContainer>
  );
};

export default AdminSauceListPage;
