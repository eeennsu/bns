import { IBundleDisplay } from '@entities/bundle/types';

export const getDetailPath = (type: keyof IBundleDisplay['products'], id: number) => {
  const pathMapper = {
    breads: '/product/bread/',
    sauces: '/product/sauce/',
    dishes: '/product/dish/',
    drinks: '/product/drink/',
    desserts: '/product/dessert/',
  } as const;

  return `${pathMapper[type]}${encodeURIComponent(id)}`;
};

export const sortItems = (items: IBundleDisplay['products'][keyof IBundleDisplay['products']]) =>
  [...items].sort((a, b) => {
    if (a.quantity !== b.quantity) return a.quantity - b.quantity;
    return a.name.localeCompare(b.name, 'ko');
  });
