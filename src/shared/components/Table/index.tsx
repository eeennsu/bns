import { CircleCheckBig, X } from 'lucide-react';
import type { ReactNode, SyntheticEvent } from 'react';

import { Table as ShadcnTable, TableBody, TableHead, TableHeader, TableRow } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import { ITableDefaultItem } from '@typings/commons';

import TableSkeleton from './Skeleton';
import TableCell from './TableCell';

interface IProps<T extends ITableDefaultItem> {
  headers: string[];
  items: T[];
  showItems: Array<keyof T>;
  renderItemProps?: Array<{
    itemKey: keyof T;
    children: (item: T) => ReactNode;
  }>;
  isLoading?: boolean;
  onClickItem?: (id: T) => () => void;
  emptyDataText?: string;
  className?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: string;
}

const Table = <T extends ITableDefaultItem>({
  headers,
  items,
  showItems,
  renderItemProps,
  isLoading,
  onClickItem,
  emptyDataText,
  className,
  tableHeaderClassName,
  tableRowClassName,
}: IProps<T>) => {
  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = '';
  };

  const renderItem = (rowItem: T, itemKey: string) => {
    const cellValue = rowItem[itemKey];

    if (renderItemProps?.length > 0) {
      const renderItemProp = renderItemProps.find(prop => prop.itemKey === itemKey);

      if (renderItemProp) {
        return (
          <TableCell key={itemKey} isStopPropagation>
            {renderItemProp.children(rowItem)}
          </TableCell>
        );
      }
    }

    if (itemKey === 'image' && rowItem?.image) {
      return (
        <TableCell key={itemKey} isStopPropagation>
          <img
            src={rowItem.image}
            alt={rowItem?.name || 'image'}
            className='size-14 object-cover'
            onError={onImageError}
          />
        </TableCell>
      );
    }

    if (typeof cellValue === 'boolean') {
      return (
        <TableCell key={itemKey}>
          <div className='flex items-center justify-center'>
            {cellValue === true ? (
              <CircleCheckBig className='text-green-500' size={16} />
            ) : (
              <X className='text-red-500' size={16} />
            )}
          </div>
        </TableCell>
      );
    }

    if (typeof cellValue === 'number') {
      return <TableCell key={itemKey}>{cellValue.toLocaleString('ko-KR')}</TableCell>;
    }

    if (cellValue === undefined || cellValue === null || cellValue === '') {
      return (
        <TableCell key={itemKey} className='text-slate-500'>
          -
        </TableCell>
      );
    }

    return <TableCell key={itemKey}>{String(cellValue)}</TableCell>;
  };

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <ShadcnTable
      className={cn(
        className,
        'w-full border-separate border-spacing-0 overflow-hidden rounded-lg shadow-sm',
      )}
    >
      <TableHeader>
        <TableRow className={cn('', tableHeaderClassName)}>
          {headers.map(header => (
            <TableHead
              key={header}
              className='max-w-20 bg-gray-50 px-6 py-4 text-center text-xs font-semibold tracking-wider break-words whitespace-normal text-gray-600 uppercase'
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={headers.length} className='py-10 text-center text-sm text-gray-500'>
              {emptyDataText || '데이터가 없습니다.'}
            </TableCell>
          </TableRow>
        ) : (
          items?.map(rowItem => (
            <TableRow
              key={rowItem.id}
              onClick={onClickItem(rowItem)}
              className={cn(onClickItem !== undefined && 'cursor-pointer', tableRowClassName)}
            >
              {[...new Set(showItems)].map(itemKey => renderItem(rowItem, String(itemKey)))}
            </TableRow>
          ))
        )}
      </TableBody>
    </ShadcnTable>
  );
};

export default Table;
