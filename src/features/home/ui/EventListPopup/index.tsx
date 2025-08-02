'use client';

import { ProductData } from '@shared/typings/commons';
import { motion } from 'framer-motion';
import { FC } from 'react';

import { IEvent } from '@entities/event/types';

import useEventPopup from '../../hooks/useEventPopup';
import AnimatedEventPopup from './AnimatedEventPopup';
import CloseButton from './CloseButton';
import DontShowOption from './DontShowOption';
import DotButton from './DotButton';
import EventPopupHeader from './EventPopupHeader';

interface IProps {
  events: ProductData<IEvent>[];
}

export const EventListPopup: FC<IProps> = ({ events }) => {
  const {
    isShow,
    currentEventIndex,
    dontShowForThreeDays,
    direction,
    setDontShowForThreeDays,
    onHideEvent,
    onDotChange,
  } = useEventPopup({ events });

  if (!isShow || events.length === 0) return null;

  const currentEvent = events[currentEventIndex];
  if (!currentEvent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-all duration-300 ease-in-out sm:p-6'
    >
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        exit={{ y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='bg-ivory xl:max-h-[] relative flex h-full w-full max-w-[95%] flex-col rounded-lg border border-[#e8e0d0] shadow-lg sm:max-w-xl 2xl:max-h-[70vh]'
      >
        <CloseButton onClick={onHideEvent} />
        <section className='flex h-full flex-1 flex-col'>
          <EventPopupHeader />
          <AnimatedEventPopup direction={direction} event={currentEvent} />
        </section>
        <section className='flex flex-col gap-2 px-4 pb-4'>
          {events.length > 1 && (
            <nav className='z-20 flex items-center justify-center gap-5'>
              {/* <ArrowButton onClick={onPrevEvent}>
                  <ChevronLeft className='size-3.5' />
                </ArrowButton> */}
              <div className='flex justify-center space-x-3 sm:space-x-1'>
                {events.map((event, index) => (
                  <DotButton
                    key={event.id}
                    onClick={() => onDotChange(index)}
                    className={index === currentEventIndex ? 'bg-[#a87c50]' : 'bg-[#d4a373]/50'}
                  />
                ))}
              </div>
              {/* <ArrowButton onClick={onNextEvent}>
                <ChevronRight className='size-3.5' />
              </ArrowButton> */}
            </nav>
          )}

          <DontShowOption
            checked={dontShowForThreeDays}
            onCheckedChange={setDontShowForThreeDays}
            onHideEvent={onHideEvent}
          />
        </section>
      </motion.div>
    </motion.div>
  );
};

export default EventListPopup;
