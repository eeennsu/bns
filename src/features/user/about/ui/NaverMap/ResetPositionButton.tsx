import { MapPinned } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

const ResetPositionButton: FC<ComponentProps<'button'>> = props => {
  return (
    <button
      className='absolute right-4 bottom-4 z-10 inline-flex size-10 transform cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:bg-green-600'
      {...props}
    >
      <MapPinned className='size-5' />
    </button>
  );
};

export default ResetPositionButton;
