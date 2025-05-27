import { CircleCheckBig, X } from 'lucide-react';
import type { ReactNode, SyntheticEvent } from 'react';

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn-ui/ui/table';

import { ITableDefaultItem } from '@typings/commons';

import TableSkeleton from './Skeleton';
import Td from './Td';

interface IProps<T> {
  headers: string[];
  items: T[];
  itemKeys: Array<keyof T>;
  renderItemProps?: Array<{
    itemKey: string;
    children: (item: T) => ReactNode;
  }>;
  isLoading?: boolean;
  onClickItem?: (item: T) => () => void;
  emptyDataText?: string;
  className?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: string;
}

const Table = <T extends ITableDefaultItem>({
  headers,
  items,
  itemKeys,
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
          <Td key={itemKey} isStopPropagation>
            {renderItemProp.children(rowItem)}
          </Td>
        );
      }
    }

    if (itemKey === 'image' && rowItem?.image) {
      return (
        <Td key={itemKey} isStopPropagation>
          <img
            src={rowItem.image}
            alt={rowItem?.name || 'image'}
            className='m-auto size-14 object-cover'
            onError={onImageError}
          />
        </Td>
      );
    }

    if (typeof cellValue === 'boolean') {
      return (
        <Td key={itemKey}>
          {cellValue === true ? (
            <CircleCheckBig className='text-green-500' />
          ) : (
            <X className='text-red-500' />
          )}
        </Td>
      );
    }

    if (typeof cellValue === 'number') {
      return <Td key={itemKey}>{cellValue.toLocaleString('ko-KR')}</Td>;
    }

    if (cellValue === undefined || cellValue === null || cellValue === '') {
      return (
        <Td key={itemKey} className='text-slate-500'>
          -
        </Td>
      );
    }

    return <Td key={itemKey}>{String(cellValue)}</Td>;
  };

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <ShadcnTable className={className}>
      <TableHeader>
        <TableRow className={tableHeaderClassName}>
          {headers.map(header => (
            <TableHead key={header} className='max-w-20 p-4 break-words'>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={headers.length}
              className='flex h-10 items-center justify-center text-gray-600'
            >
              {emptyDataText || '데이터가 없습니다.'}
            </TableCell>
          </TableRow>
        ) : (
          items?.map(rowItem => (
            <TableRow key={rowItem.id} onClick={onClickItem(rowItem)} className={tableRowClassName}>
              {itemKeys.map(itemKey => renderItem(rowItem, String(itemKey)))}
            </TableRow>
          ))
        )}
      </TableBody>
    </ShadcnTable>
  );
};

export default Table;
