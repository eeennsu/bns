import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';

const DO_NOT_SHOW_KEY = 'popup-hide-until';

interface IParams {
  events: any[];
}

const useEventPopup = ({ events }: IParams) => {
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [dontShowForThreeDays, setDontShowForThreeDays] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (events.length === 0) return;
    const now = dayjs();
    const hiddenUntil = localStorage.getItem(DO_NOT_SHOW_KEY);
    const isHidden = hiddenUntil && dayjs(hiddenUntil).isAfter(now);

    if (events.length > 0 && !isHidden) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 500);

      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const onHideEvent = () => {
    if (dontShowForThreeDays) {
      const threeDaysLater = dayjs().add(3, 'day');

      localStorage.setItem(DO_NOT_SHOW_KEY, threeDaysLater.toISOString());
    }

    setShowPopup(false);
  };

  const onPrevEvent = () => {
    setCurrentEventIndex(prev => (prev - 1 + events.length) % events.length);
  };

  const onNextEvent = () => {
    setCurrentEventIndex(prev => (prev + 1 + events.length) % events.length);
  };

  return {
    currentEventIndex,
    showPopup,
    dontShowForThreeDays,
    setCurrentEventIndex,
    setDontShowForThreeDays,
    onHideEvent,
    onPrevEvent,
    onNextEvent,
  };
};

export default useEventPopup;
