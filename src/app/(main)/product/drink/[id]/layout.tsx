import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getDrink from '@features/drink/queries/getDrink';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, drink] = await getDrink({ id: +id });

  const drinkName = error ? '음료' : drink?.name?.slice(0, 10) || '음료';

  return {
    title: `${drinkName} | ${BRAND_TITLE.EN}`,
    description: `${drink?.name} 음료 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${drinkName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${drinkName} 음료 페이지입니다.`,
      url: SITE_LINK,
      siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${drinkName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${drinkName} 음료 페이지입니다.`,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE_LINK,
    },
  };
};

const DrinkDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default DrinkDetailLayout;
