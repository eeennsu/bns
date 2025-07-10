import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { BundleFormDto, BundleProductLabel, ICommandGroupBundle } from '@entities/bundle/types';

import { getProductName } from '../libs/getProductName';

interface IParams {
  commandGroups: ICommandGroupBundle[];
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
}

const useSelectProductList = ({ commandGroups, setCommandGroups }: IParams) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<BundleFormDto>();

  const [selectedProducts, setSelectedProducts] = useState<ICommandGroupBundle[]>([]);

  const calculateTotalPrice = (products: ICommandGroupBundle[]) =>
    products.reduce(
      (acc, group) => acc + group.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      0,
    );

  const toFormProductsList = (products: ICommandGroupBundle[]): BundleFormDto['productsList'] => {
    return products.reduce<BundleFormDto['productsList']>((acc, group) => {
      group.items.forEach((item, index) => {
        const key = getProductName(group.heading.label as BundleProductLabel);
        acc[key] = [
          ...(acc[key] ?? []),
          {
            id: item.value,
            quantity: item.quantity,
            sortOrder: index + 1,
          },
        ];
      });
      return acc;
    }, {});
  };

  const syncForm = (updated: ICommandGroupBundle[]) => {
    const productsList = toFormProductsList(updated);
    const total = calculateTotalPrice(updated);

    setValue('productsList', productsList, { shouldDirty: true });
    setValue('price', total, { shouldDirty: true });

    const totalQuantity = Object.values(productsList)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);

    if (errors.productsList && totalQuantity >= 2) {
      clearErrors('productsList');
    }
  };

  useEffect(() => {
    const selected = commandGroups.map(group => ({
      heading: group.heading,
      items: group.items
        .filter(item => item.selected)
        .map(item => ({
          ...item,
          quantity: item.quantity ?? 1,
        })),
    }));

    setSelectedProducts(selected);
    syncForm(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandGroups]);

  const deselectCommandGroups = (groupKey: string, itemKey: number) => {
    setCommandGroups(prev =>
      prev.map(group =>
        group.heading.value !== groupKey
          ? group
          : {
              ...group,
              items: group.items.map(item =>
                item.value !== itemKey ? item : { ...item, selected: undefined },
              ),
            },
      ),
    );
  };

  const removeSelectedItem = (groupKey: string, itemKey: number) => {
    const updated = selectedProducts.map(group =>
      group.heading.value !== groupKey
        ? group
        : { ...group, items: group.items.filter(item => item.value !== itemKey) },
    );

    setSelectedProducts(updated);
    syncForm(updated);
    deselectCommandGroups(groupKey, itemKey);
  };

  const updateQuantity = (groupKey: string, itemKey: number, delta: number) => {
    let removed = false;

    const updated = selectedProducts.map(group => {
      if (group.heading.value !== groupKey) return group;

      const items = group.items.reduce(
        (acc, item) => {
          if (item.value !== itemKey) {
            acc.push(item);
          } else {
            const newQuantity = item.quantity + delta;
            if (newQuantity > 0) {
              acc.push({ ...item, quantity: newQuantity });
            } else {
              removed = true;
            }
          }
          return acc;
        },
        [] as typeof group.items,
      );

      return { ...group, items };
    });

    setSelectedProducts(updated);
    syncForm(updated);
    if (removed) deselectCommandGroups(groupKey, itemKey);
  };

  return {
    selectedProducts,
    setSelectedProducts,
    updateQuantity,
    removeSelectedItem,
    allSumPrice: calculateTotalPrice(selectedProducts),
  };
};

export default useSelectProductList;
