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

const SelectedProductList: FC<IProps> = ({ commandGroups, setCommandGroups }) => {
  const { selectedProducts, updateQuantity, removeSelectedItem, allSumPrice } =
    useSelectProductList({
      commandGroups,
      setCommandGroups,
    });

  return selectedProducts?.length > 0 ? (
    <div>
      <div className='mb-6 flex w-full flex-col'>
        {selectedProducts?.map(group => (
          <div key={group.heading.value} className='flex flex-col gap-1 border-b py-6'>
            <div className='flex items-center justify-between'>
              <div className='text-muted-foreground text-xs font-semibold'>
                {group.heading.label}
              </div>
              {group.items.length > 0 && (
                <p className='text-[10px] text-gray-400'>
                  선택 합계 :{' '}
                  <span className='font-semibold'>
                    {group.items
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString()}
                  </span>
                  원
                </p>
              )}
            </div>
            <div className='flex flex-wrap gap-3.5'>
              {group?.items?.length > 0 ? (
                group?.items?.map(item => (
                  <SelectedProductItem
                    key={item.value}
                    item={item}
                    updateQuantity={delta => updateQuantity(group.heading.value, item.value, delta)}
                    removeSelectedItem={() => removeSelectedItem(group.heading.value, item.value)}
                  />
                ))
              ) : (
                <p className='text-[10px] text-gray-400'>아직 추가된 상품이 없습니다.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {allSumPrice > 0 ? (
        <Alert variant='info'>
          <Info />
          <AlertTitle className='text-xs'>
            선택된 세트 구성의 합계는{' '}
            <span className='text-sm font-bold'>{allSumPrice.toLocaleString()}</span> 원 입니다.
          </AlertTitle>
        </Alert>
      ) : null}
    </div>
  ) : null;
};

export default SelectedProductList;
