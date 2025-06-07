import { Info } from 'lucide-react';
import { Dispatch, SetStateAction, type FC } from 'react';

import { Alert, AlertTitle } from '@shadcn-ui/ui';

import useSelectProductList from '@features/bundle/hooks/useSelectProductList';

import { ICommandGroupBundle } from '@entities/bundle/types';

import SelectedProductItem from './SelectedProductItem';

interface IProps {
  commandGroups: ICommandGroupBundle[];
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
}

const SelectProductList: FC<IProps> = ({ commandGroups, setCommandGroups }) => {
  const { sortedSelectedProducts, updateQuantity, removeSelectedItem, allSumPrice } =
    useSelectProductList({
      commandGroups,
      setCommandGroups,
    });

  return sortedSelectedProducts.length > 0 ? (
    <div>
      <div className='flex w-full flex-col'>
        {sortedSelectedProducts.map(group => (
          <div key={group.heading.value} className='flex flex-col gap-2 py-3 not-last:border-b'>
            <div className='text-muted-foreground text-xs font-semibold'>{group.heading.label}</div>
            <div className='flex flex-wrap gap-3.5'>
              {group.items.length > 0 ? (
                group.items.map(item => (
                  <SelectedProductItem
                    key={item.value}
                    item={item}
                    updateQuantity={delta => updateQuantity(group.heading.value, item.value, delta)}
                    removeSelectedItem={() => removeSelectedItem(group.heading.value, item.value)}
                  />
                ))
              ) : (
                <p className='text-[10px] text-gray-500'>
                  추가된 {group.heading.label}이(가) 없습니다.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {allSumPrice > 0 && (
        <Alert variant='info'>
          <Info />
          <AlertTitle className='text-xs'>
            선택된 세트 구성의 합계는{' '}
            <span className='text-sm font-bold'>{allSumPrice.toLocaleString()}</span> 원 입니다.
          </AlertTitle>
        </Alert>
      )}
    </div>
  ) : null;
};

export default SelectProductList;
