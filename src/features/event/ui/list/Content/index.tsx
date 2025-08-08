import ErrorMessage from '@shared/components/ErrorMessage';
import Pagination from '@shared/components/Pagination';
import { PER_PAGE_SIZE } from '@shared/consts/commons';
import { FC } from 'react';

import getEventList from '@features/event/queries/getList';
import EmptyProduct from '@features/home/ui/FullPageScroll/EmptyProduct';

import EventCard from './Card';

interface IProps {
  currentPage: string;
}

const EventListContent: FC<IProps> = async ({ currentPage }) => {
  const [error, data] = await getEventList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
  });

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : data.list.length === 0 ? (
        <EmptyProduct />
      ) : (
        <section className='divide-border flex flex-col divide-y border-y'>
          {data.list.map((event, index, arr) => (
            <EventCard key={event.id} event={event} index={arr.length - index} />
          ))}
        </section>
      )}

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default EventListContent;
