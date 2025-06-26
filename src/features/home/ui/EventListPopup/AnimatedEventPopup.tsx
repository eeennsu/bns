import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import EventPopup from '@features/event/ui/Popup';

import { Direction } from '@typings/commons';

interface Props {
  direction: Direction;
  event: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    image: string;
  };
}

const AnimatedEventPopup: FC<Props> = ({ direction, event }) => {
  return (
    <AnimatePresence initial={false} custom={direction} mode='wait'>
      <motion.div
        key={event.id}
        custom={direction}
        variants={{
          enter: (direction: Direction) => ({
            opacity: 0,
            x: direction === 'right' ? 10 : -10,
          }),
          center: { opacity: 1, x: 0 },
          exit: (direction: Direction) => ({
            opacity: 0,
            x: direction === 'right' ? -10 : 10,
          }),
        }}
        initial='enter'
        animate='center'
        exit='exit'
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='flex w-full flex-1'
      >
        <EventPopup key={event.id} {...event} />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedEventPopup;
