import { IPathSlug } from '@typings/typings';

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
      return USER_PATHS.bread.root();
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
      return USER_PATHS.sauce.root();
    },
    bySlug: ({ slug }: IPathSlug) => {
      return USER_PATHS.sauce.root().concat(`/${slug}`);
    },
  },
} as const;
