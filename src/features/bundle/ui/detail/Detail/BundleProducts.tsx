import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/shadcn-ui/ui/tabs';
import Link from 'next/link';
import { FC, useMemo } from 'react';

import { IBundleDisplay, IBundleProductDisplay } from '@entities/bundle/types';

interface IProps {
  products: IBundleDisplay['products'];
}

const BundleProducts: FC<IProps> = ({ products }) => {
  const categories = useMemo(
    () =>
      [
        { key: 'bread', label: '빵', items: products?.breads || [] },
        { key: 'sauce', label: '소스', items: products?.sauces || [] },
        { key: 'dish', label: '디쉬', items: products?.dishes || [] },
        { key: 'drink', label: '음료', items: products?.drinks || [] },
        { key: 'dessert', label: '디저트', items: products?.desserts || [] },
      ] as {
        key: string;
        label: string;
        items: IBundleProductDisplay[];
      }[],
    [products],
  ).filter(c => c.items.length > 0);

  return (
    <div className='flex flex-col lg:gap-1'>
      <p className='hidden text-xs text-gray-500 lg:block lg:text-sm'>
        세트 구성에 포함된 항목을 카테고리별로 확인하세요.
      </p>
      <Tabs
        defaultValue={categories.find(c => c.items.length > 0)?.key ?? 'breads'}
        className='flex justify-center'
      >
        <TabsList className='flex h-fit w-full flex-wrap rounded-md bg-gray-100 p-1 lg:w-fit lg:gap-1'>
          {categories.map(c => (
            <TabsTrigger
              key={c.key}
              value={c.key}
              className='cursor-pointer px-1.5 py-0.5 text-xs font-medium lg:px-4 lg:py-2 lg:text-xs'
            >
              {c.label}
              <span className='ml-0.5 text-gray-500'>({c.items.length})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(c => (
          <TabsContent key={c.key} value={c.key}>
            {c.items.length === 0 ? (
              <div className='text-sm text-gray-400'>해당 카테고리의 구성품이 없습니다.</div>
            ) : (
              <div className='divide-y divide-gray-200 border-gray-200 bg-white'>
                {c.items.map(item => (
                  <Link
                    className='group flex items-center justify-between p-2 transition-colors lg:p-3'
                    key={item.id}
                    href={MAIN_PATHS.product[c.key].detail({ slug: item.id })}
                  >
                    <div className='truncate text-sm font-medium text-gray-900 group-hover:underline'>
                      {item.name}
                    </div>
                    <span className='rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700'>
                      x{item.quantity ?? 1}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BundleProducts;
