import { Minus, Plus, X } from 'lucide-react';
import type { FC } from 'react';

import { SelectedProductItem as SelectedProductItemType } from '@entities/bundle/types';

interface IProps {
  item: SelectedProductItemType;
  updateQuantity: (delta: number) => void;
  removeSelectedItem: () => void;
}

const SelectedProductItem: FC<IProps> = ({ item, updateQuantity, removeSelectedItem }) => {
  return (
    <div className='group relative flex min-w-90 items-center justify-between rounded-sm border border-gray-300 bg-white px-4 py-3'>
      <button
        type='button'
        className='invisible absolute -top-2 -right-2 cursor-pointer rounded-md bg-gray-200 p-1 text-gray-400 group-hover:visible hover:bg-gray-300 hover:text-gray-700'
        onClick={removeSelectedItem}
      >
        <X size={14} />
      </button>
      <div className='flex flex-col'>
        <span className='text-foreground truncate text-sm font-medium'>{item.label}</span>
        <span className='text-muted-foreground mt-0.5 text-xs'>
          {item.price.toLocaleString()}원
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => updateQuantity(-1)}
          className='border-input bg-background text-muted-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border active:scale-95'
        >
          <Minus size={16} />
        </button>
        {item?.quantity ? (
          <span className='text-foreground w-6 text-center text-sm'>{item?.quantity}</span>
        ) : (
          <span>수량을 확인할 수 없습니다. 다시 골라주세요.</span>
        )}
        <button
          type='button'
          onClick={() => updateQuantity(1)}
          className='border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border transition active:scale-95'
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SelectedProductItem;
