import { JSX } from 'react';
import { z } from 'zod';

import { ImageFileInputSchema, SearchFormDtoSchema } from '@contracts/common';

export type Nullable<T> = T | null;

export interface IMenuRoute {
  parentMenuName: string;
  path: string;
  menuName: string;
  order: number;
  icon?: ({ isActive }: { isActive: boolean }) => JSX.Element;
}
export interface IPathSlug {
  slug: string | number;
}

export interface IMenu {
  title: string;
  path: string;
}

export type SubMenu = Record<string, IMenu>;

export interface IHeaderMenu extends IMenu {
  subMenus?: SubMenu;
}

export type Direction = 'left' | 'right';

export interface IList<T> {
  page: number;
  total: number;
  items: T[];
}

export interface IAdminMenuRoute {
  path: string;
  menuName: string;
  order: number;
}

type TableItemType = string | number | boolean;
export type ITableItem = Record<string, TableItemType>;

export interface ITableDefaultItem {
  id: string | number;
  name?: string;
  type?: string;
  rank?: string | number;
  image?: string;
}

export type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;

export type ImageFileInput = z.infer<typeof ImageFileInputSchema>;
export type FileWithPreview = File & { preview: string };
export type FileWithDropzone = FileWithPreview | IImageFile;

export interface IImageFile {
  id: string;
  url: string;
  name: string;
  type: string;
  lastModified?: number;
  size: number;
  order?: number | string;
  preview?: string;
}

interface IAuditDate {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type FilterDate<T> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & IAuditDate;
export interface IGetListParams {
  page: string | number;
  pageSize: string | number;
  search?: string;
}
