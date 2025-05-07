import { Bean } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

const ResetPositionButton: FC<ComponentProps<'button'>> = props => {
  return (
    <button
      className='absolute right-4 bottom-4 z-10 inline-flex size-10 transform cursor-pointer items-center justify-center rounded-full bg-amber-700 text-white shadow-lg transition-transform hover:scale-105 hover:bg-amber-600'
      {...props}
    >
      <Bean className='size-5' />
    </button>
  );
};

export default ResetPositionButton;
