import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getDessert from '@features/dessert/queries/getDessert';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, dessert] = await getDessert({ id: +id });

  const dessertName = error ? '디저트' : dessert?.name?.slice(0, 10) || '디저트';

  return {
    title: `${dessertName} | ${BRAND_TITLE.EN}`,
    description: `${dessert?.name} 디저트 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${dessertName} | ${BRAND_TITLE.EN}`,
      description: `${dessertName} 디저트 페이지입니다.`,
      url: SITE_LINK,
      siteName: BRAND_TITLE.EN,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${dessertName} | ${BRAND_TITLE.EN}`,
      description: `${dessertName} 디저트 페이지입니다.`,
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

const DessertDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default DessertDetailLayout;
