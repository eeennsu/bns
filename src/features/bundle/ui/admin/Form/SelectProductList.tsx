import { Info } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, type FC } from 'react';
import { FieldArrayWithId, UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form';

import { Alert, AlertTitle } from '@shadcn-ui/ui';

import { getProductLabel } from '@features/bundle/libs/getProductLabel';

import {
  BundleFormDto,
  BundleProductValue,
  ICommandGroupBundle,
  SelectedProductItem as SelectedProductItemType,
} from '@entities/bundle/types';

import SelectedProductItem from './SelectedProductItem';

interface IProps {
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
  productFields: FieldArrayWithId<BundleFormDto, 'products', 'fid'>[];
  updateProduct: UseFieldArrayUpdate<BundleFormDto, 'products'>;
  removeProduct: UseFieldArrayRemove;
}

const SelectedProductList: FC<IProps> = ({
  setCommandGroups,
  productFields,
  updateProduct,
  removeProduct,
}) => {
  const groupedProductFields = useMemo(() => {
    const grouped = productFields.reduce<{
      bread: SelectedProductItemType[];
      sauce: SelectedProductItemType[];
      dish: SelectedProductItemType[];
      drink: SelectedProductItemType[];
    }>(
      (acc, product) => {
        const productItem = {
          label: product.name,
          value: product.id,
          quantity: product.quantity,
          price: product.price,
          sortOrder: product.sortOrder,
        };

        if (product.type in acc) {
          acc[product.type as keyof typeof acc].push(productItem);
        }

        return acc;
      },
      {
        bread: [],
        sauce: [],
        dish: [],
        drink: [],
      },
    );

    for (const key of Object.keys(grouped) as Array<keyof typeof grouped>) {
      grouped[key].sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return grouped;
  }, [productFields]);

  console.log('groupedProductFields', groupedProductFields);

  const allSumPrice = useMemo(() => {
    return Object.values(productFields).reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }, [productFields]);

  const updateProductQuantity = (
    type: BundleProductValue,
    value: number | string,
    delta: number,
  ) => {
    const existingProductIndex = productFields.findIndex(
      item => item.type === type && item.id === value,
    );
    if (existingProductIndex === -1) return;

    const newQuantity = productFields[existingProductIndex].quantity + delta;

    if (newQuantity > 0) {
      updateProduct(existingProductIndex, {
        ...productFields[existingProductIndex],
        quantity: newQuantity,
      });
    } else {
      removeProductWithCommandGroup(existingProductIndex, type, value);
    }
  };

  const removeProductItem = (type: BundleProductValue, value: number | string) => {
    const existingProductIndex = productFields.findIndex(
      item => item.type === type && item.id === value,
    );
    if (existingProductIndex === -1) return;

    removeProductWithCommandGroup(existingProductIndex, type, value);
  };

  const removeProductWithCommandGroup = (
    removeIndex: number,
    type: BundleProductValue,
    value: number | string,
  ) => {
    removeProduct(removeIndex);
    setCommandGroups(prev =>
      prev.map(group => {
        if (group.heading.value !== type) return group;

        const updatedItems = group.items.map(item =>
          item.value === value ? { ...item, selected: undefined } : item,
        );

        return {
          ...group,
          items: updatedItems,
        };
      }),
    );
  };

  return productFields?.length > 0 ? (
    <div>
      <div className='mb-6 flex w-full flex-col'>
        {Object.keys(groupedProductFields).map(key => (
          <div key={key} className='flex flex-col gap-1 border-b py-6'>
            <div className='flex items-center justify-between'>
              <div className='text-muted-foreground text-xs font-semibold'>
                {getProductLabel(key as BundleProductValue)}
              </div>
              {groupedProductFields[key].length > 0 && (
                <p className='text-[10px] text-gray-400'>
                  선택 합계 :{' '}
                  <span className='font-semibold'>
                    {groupedProductFields[key]
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      ?.toLocaleString()}
                  </span>
                  원
                </p>
              )}
            </div>
            <div className='flex flex-wrap gap-3.5'>
              {groupedProductFields[key]?.length > 0 ? (
                groupedProductFields[key]?.map((item: SelectedProductItemType) => (
                  <SelectedProductItem
                    key={`${item.value}-${item.label}`}
                    item={item}
                    updateProductQuantity={delta =>
                      updateProductQuantity(key as BundleProductValue, item.value, delta)
                    }
                    removeSelectedItem={() =>
                      removeProductItem(key as BundleProductValue, item.value)
                    }
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
