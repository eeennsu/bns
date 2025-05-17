'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift, X } from 'lucide-react';
import { FC } from 'react';

import { Checkbox } from '@shadcn-ui/ui/checkbox';
import { cn } from '@shadcn-ui/utils';

import EventPopup from '@features/user/event/ui/Popup';

import useEventPopup from '../../hooks/useEventPopup';

const events = [
  {
    id: '1',
    title: '허니브레드 버터 세트 이벤트',
    description:
      '허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다 허니브레드 버터 세트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
  },
  {
    id: '2',
    title: '땅콩 빵 버터 세트 이벤트',
    description:
      '땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다 땅콩 빵 버터 세트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
  },
  {
    id: '3',
    title: '메론빵 이벤트',
    description:
      '메론빵은 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다 메론빵 이벤트는 엄청나게 맛있습니다',
    startDate: '2025-05-17',
    endDate: '2025-05-19',
  },
];

export const EventPopupList: FC = () => {
  const {
    currentEventIndex,
    showPopup,
    dontShowForThreeDays,
    setDontShowForThreeDays,
    setCurrentEventIndex,
    onHideEvent,
    onPrevEvent,
    onNextEvent,
  } = useEventPopup({ events });

  if (!showPopup || events.length === 0) return null;

  const currentEvent = events[currentEventIndex];

  if (!currentEvent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-all duration-300 ease-in-out'
    >
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        exit={{ y: -10 }}
        transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
        className='relative max-h-[90vh] w-full max-w-md rounded-lg border border-[#e8e0d0] bg-[#faf7f2] shadow-lg'
      >
        <button
          onClick={onHideEvent}
          className='absolute top-3 right-3 z-20 cursor-pointer rounded-full bg-white/80 p-1 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg'
        >
          <X className='size-4' />
        </button>
        <div className='overflow-hidden'>
          <div className='rounded-t-lg bg-gradient-to-r from-[#d4a373] to-[#a87c50] p-4 text-center text-white'>
            <div className='mb-2 flex justify-center'>
              <Gift className='size-10' />
            </div>
            <h2 className='text-xl font-bold'>특별 이벤트</h2>
          </div>

          <AnimatePresence initial={false} mode='wait'>
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='w-full'
            >
              <EventPopup {...currentEvent} />
            </motion.div>
          </AnimatePresence>
          <div className='flex items-center gap-1.5 px-5 pb-7'>
            <Checkbox
              id='dontShow'
              checked={dontShowForThreeDays}
              onCheckedChange={checked => setDontShowForThreeDays(checked === true)}
              className='border-[#a87c50] data-[state=checked]:bg-[#a87c50] data-[state=checked]:text-white'
            />
            <label htmlFor='dontShow' className='cursor-pointer text-sm text-[#6c6055]'>
              3일간 보지 않기
            </label>
          </div>
        </div>

        {events.length > 1 && (
          <nav>
            <button
              onClick={onPrevEvent}
              className='absolute top-[64%] left-1 cursor-pointer rounded-full bg-yellow-600 p-1 text-white transition-colors hover:brightness-110'
            >
              <ChevronLeft className='size-4' />
            </button>
            <button
              onClick={onNextEvent}
              className='absolute top-[64%] right-1 cursor-pointer rounded-full bg-yellow-600 p-1 text-white transition-colors hover:brightness-110'
            >
              <ChevronRight className='size-4' />
            </button>
          </nav>
        )}

        {events.length > 1 && (
          <div className='absolute right-0 bottom-3 left-0 z-20 flex justify-center space-x-1'>
            {events.map((event, index) => (
              <button
                key={event.id}
                onClick={() => setCurrentEventIndex(index)}
                className={cn(
                  'hover:bg-wood-tertiary h-2 w-2 cursor-pointer rounded-full',
                  index === currentEventIndex ? 'bg-[#a87c50]' : 'bg-[#d4a373]/50',
                )}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EventPopupList;
