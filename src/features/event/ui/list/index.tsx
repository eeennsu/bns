import { FC } from 'react';

import getEventList from '@features/event/queries/getList';
import EventListPopup from '@features/home/ui/EventListPopup';

const EventList: FC = async () => {
  const [error, events] = await getEventList();

  return error ? null : <EventListPopup events={events} />;
};

export default EventList;
