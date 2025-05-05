import { USER_PATHS } from '../configs/routes/userPaths';

export const BRAND_TITLE = {
  EN: 'Bread & Sauce',
  KO: '브래드앤소스',
};

export const USER_MENU_LIST = [
  {
    title: 'About',
    href: USER_PATHS.about(),
  },
  {
    title: 'Breads',
    href: USER_PATHS.bread.list(),
  },
  {
    title: 'Sauces',
    href: USER_PATHS.sauce.list(),
  },
];

export const HERO_TITLE_DURATIONS = {
  DESCRIPTION: 0.2,
};

export const HERO_ANIM_DURATIONS = {
  IMAGE: HERO_TITLE_DURATIONS.DESCRIPTION + 0.5,
};

export const SITE_LINK = ''; // TODO: 링크 추가
