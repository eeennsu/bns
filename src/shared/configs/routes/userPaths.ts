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
  bread: {
    root() {
      return USER_PATHS.root.concat('bread');
    },
    list() {
      return USER_PATHS.bread.root().concat(LIST_PAGE_ROUTE);
    },
    bySlug: ({ slug }: IPathSlug) => {
      return USER_PATHS.bread.root().concat(`/${slug}`);
    },
  },
  sauce: {
    root() {
      return USER_PATHS.root.concat('sauce');
    },
    list() {
      return USER_PATHS.sauce.root().concat(LIST_PAGE_ROUTE);
    },
    bySlug: ({ slug }: IPathSlug) => {
      return USER_PATHS.sauce.root().concat(`/${slug}`);
    },
  },
} as const;
