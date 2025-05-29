'use client';

import { Calendar } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@shadcn-ui/ui';

import useEventPopupStore from '@stores/eventPopup';

import { STORAGE_KEYS } from '@consts/storage';

const EventPopupButton: FC = () => {
  const { setIsShow } = useEventPopupStore();

  const onEventPopup = () => {
    setIsShow(true);
    localStorage.removeItem(STORAGE_KEYS.POPUP_HIDE_UNTIL);
  };

  return (
    <Button
      className='w-fit gap-1.5 px-8 py-3 font-medium'
      size='lg'
      variant='meadow'
      onClick={onEventPopup}
    >
      어떤 이벤트가 있나요? <Calendar />
    </Button>
  );
};

export default EventPopupButton;
