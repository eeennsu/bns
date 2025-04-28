import { IPathSlug } from '@typings/typings';

const USER_PATHS = {
  root: '/',
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
} as const;

export default USER_PATHS;
