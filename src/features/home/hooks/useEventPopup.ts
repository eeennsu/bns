'use client';

import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';

import { IEvent } from '@entities/event/types';

import { Direction, ProductData } from '@typings/commons';

import useEventPopupStore from '@stores/eventPopup';

import { STORAGE_KEYS } from '@consts/storage';

interface IParams {
  events: ProductData<IEvent>[];
}

const useEventPopup = ({ events }: IParams) => {
  const { isShow, setIsShow } = useEventPopupStore();

  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>('left');
  const [dontShowForThreeDays, setDontShowForThreeDays] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (events.length === 0) return;

    const now = dayjs();
    const hideUntil = localStorage.getItem(STORAGE_KEYS.POPUP_HIDE_UNTIL);
    const isHidden = hideUntil && dayjs(hideUntil).isAfter(now);

    if (hideUntil === null || !isHidden) {
      setTimeout(() => {
        setIsShow(true);
      }, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const onHideEvent = () => {
    const threeDaysLater = dayjs().add(3, 'day');

    localStorage.setItem(STORAGE_KEYS.POPUP_HIDE_UNTIL, threeDaysLater.toISOString());

    setIsShow(false);
  };

  // const onPrevEvent = () => {
  //   setCurrentEventIndex(prev => (prev - 1 + events.length) % events.length);
  //   setDirection('left');
  // };

  // const onNextEvent = () => {
  //   setCurrentEventIndex(prev => (prev + 1 + events.length) % events.length);
  //   setDirection('right');
  // };

  const onDotChange = (index: number) => {
    setCurrentEventIndex(index);
    setDirection(index > currentEventIndex ? 'right' : 'left');
  };

  return {
    isShow,
    currentEventIndex,
    dontShowForThreeDays,
    direction,
    setDontShowForThreeDays,
    onHideEvent,
    // onPrevEvent,
    // onNextEvent,
    onDotChange,
  };
};

export default useEventPopup;
