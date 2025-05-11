import { IPathSlug } from '@typings/typings';

import { LIST_PAGE_ROUTE } from './consts';

export const USER_PATHS = {
  root: '/' as const,
  home() {
    return USER_PATHS.root;
  },
  about() {
    return USER_PATHS.root.concat('about');
  },
  product: {
    root() {
      return USER_PATHS.root.concat('product');
    },
    bread: {
      root() {
        return USER_PATHS.product.root().concat('/bread');
      },
      list() {
        return USER_PATHS.product.bread.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return USER_PATHS.product.bread.root().concat(`/${slug}`);
      },
    },
    sauce: {
      root() {
        return USER_PATHS.product.root().concat('/sauce');
      },
      list() {
        return USER_PATHS.product.sauce.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return USER_PATHS.product.sauce.root().concat(`/${slug}`);
      },
    },
    set: {
      root() {
        return USER_PATHS.product.root().concat('/set');
      },
      list() {
        return USER_PATHS.product.set.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return USER_PATHS.product.set.root().concat(`/${slug}`);
      },
    },
  },
} as const;
