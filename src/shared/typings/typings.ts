export interface IPathSlug {
  slug: string;
}

export interface IMenu {
  title: string;
  href: string;
}

export type SubMenu = Record<string, IMenu>;

export interface IHeaderMenu extends IMenu {
  subMenus?: SubMenu;
}
