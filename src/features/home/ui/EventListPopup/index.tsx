'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

import useEventPopup from '../../hooks/useEventPopup';
import AnimatedEventPopup from './AnimatedEventPopup';
import CloseButton from './CloseButton';
import DontShowOption from './DontShowOption';
import DotButton from './DotButton';
import EventPopupHeader from './EventPopupHeader';

const events = [
  {
    id: '1',
    title: '허니브레드 버터 세트 이벤트',
    description:
      '허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
    image: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: '2',
    title: '땅콩 빵 버터 세트 이벤트',
    description:
      '땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
    image: 'https://picsum.photos/id/37/200/300',
  },
  {
    id: '3',
    title: '메론빵 이벤트',
    description:
      '메론빵은 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
    image: 'https://picsum.photos/id/67/200/300',
  },
];

export const EventListPopup: FC = () => {
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
