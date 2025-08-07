import { FC } from 'react';

import getEvent from '@features/event/queries/getEvent';
import EventDetail from '@features/event/ui/detail';

interface IProps {
  params: Promise<{ id: string }>;
}

const EventDetailPage: FC<IProps> = async ({ params }) => {
  const { id } = await params;
  const [error, event] = await getEvent({ id: +id });

  if (error) throw error;

  return (
    <div className='container !max-w-4xl'>
      <EventDetail event={event} />
    </div>
  );
};

export default EventDetailPage;
