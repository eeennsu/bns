import { Dispatch, SetStateAction, useEffect, useState, type FC } from 'react';

import { ICommandGroupBundle } from '@entities/bundle/types';

import { ICommandGroup } from '@typings/commons';

import SelectedProductItem from './SelectedProductItem';

interface IProps {
  commandGroups: ICommandGroupBundle[];
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
}

const SelectProductList: FC<IProps> = ({ commandGroups, setCommandGroups }) => {
  const [selectedProducts, setSelectedProducts] = useState<
    ICommandGroup<{ quantity: number; price: number }>[]
  >([]);

  useEffect(() => {
    const selectedItems = commandGroups.map(group => ({
      heading: group.heading,
      items: group.items
        .filter(item => item.selected)
        .map(item => ({
          ...item,
          quantity: 1,
        })),
    }));

    console.log('selectedItems', selectedItems);
    setSelectedProducts(selectedItems);
  }, [commandGroups]);

  const updateQuantity = (groupKey: string, itemKey: string, delta: number) => {
    setSelectedProducts(prev =>
      prev.map(group => {
        if (group.heading.value !== groupKey) return group;

        const updatedItems = group.items
          .map(item => {
            if (item.value !== itemKey) return item;
            const calculated = item.quantity + delta;

            if (calculated <= 0) {
              // setCommandGroups(prev =>
              //   prev.map(group => ({
              //     ...group,
              //     items: group.items.map(item => {
              //       if (item.quantity === 0) {
              //         delete item.quantity;
              //         return item;
              //       }
              //       return item;
              //     }),
              //   })),
              // );

              return null;
            }

            return {
              ...item,
              quantity: calculated,
            };
          })
          .filter(Boolean);

        return {
          ...group,
          items: updatedItems,
        };
      }),
    );
  };

  return (
    selectedProducts.length > 0 && (
      <div className='flex w-full flex-col'>
        {selectedProducts.map(group => (
          <div key={group.heading.value} className='flex flex-col gap-2 py-4 not-last:border-b'>
            <div className='text-muted-foreground text-xs font-semibold'>{group.heading.label}</div>
            <div className='grid grid-cols-4 gap-2'>
              {group.items.length > 0 ? (
                group.items.map(item => (
                  <SelectedProductItem
                    key={item.value}
                    item={item}
                    updateQuantity={delta => updateQuantity(group.heading.value, item.value, delta)}
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
    )
  );
};

export default SelectProductList;
