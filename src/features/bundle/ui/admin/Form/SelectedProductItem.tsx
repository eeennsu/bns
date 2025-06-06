import type { FC } from 'react';

import { SelectedProductItem as SelectedProductItemType } from '@entities/bundle/types';

interface IProps {
  item: SelectedProductItemType;
  updateQuantity: (delta: number) => void;
}

const SelectedProductItem: FC<IProps> = ({ item, updateQuantity }) => {
  return (
    <div className='bg-muted text-muted-foreground flex items-center justify-between gap-2 rounded-md px-3 py-2 text-xs'>
      <span className='truncate'>{item.label}</span>
      <div className='flex items-center gap-1'>
        <button
          type='button'
          onClick={() => updateQuantity(-1)}
          className='size-5 cursor-pointer rounded border text-sm hover:bg-gray-100'
        >
          -
        </button>
        <span className='w-6 text-center'>{item.quantity}</span>
        <button
          type='button'
          onClick={() => updateQuantity(1)}
          className='size-5 cursor-pointer rounded border text-sm hover:bg-gray-100'
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectedProductItem;

// group.heading.value, item.value
