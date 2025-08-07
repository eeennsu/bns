import { FC } from 'react';

import EventListContent from '@features/event/ui/list/Content';
import EventListHead from '@features/event/ui/list/Head';

interface IProps {
  searchParams: Promise<{ page: string }>;
}

const EventListPage: FC<IProps> = async ({ searchParams }) => {
  const { page = '1' } = await searchParams;

  return (
    <div className='container !gap-14 pt-16'>
      <EventListHead />
      <EventListContent currentPage={page} />
    </div>
  );
};

export default EventListPage;
