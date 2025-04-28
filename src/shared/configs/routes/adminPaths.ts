const ADMIN_PATHS = {
  root: '/',
  home() {
    return ADMIN_PATHS.root;
  },
  bread: {
    root() {
      return ADMIN_PATHS.root.concat('bread');
    },
    bySlug: ({ slug }: { slug: string }) => {
      return ADMIN_PATHS.bread.root().concat(`/${slug}`);
    },
  },
  event: {
    root() {
      return ADMIN_PATHS.root.concat('event');
    },
    bySlug: ({ slug }: { slug: string }) => {
      return ADMIN_PATHS.event.root().concat(`/${slug}`);
    },
  },
};

export default ADMIN_PATHS;
