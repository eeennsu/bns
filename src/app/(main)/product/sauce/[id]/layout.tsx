import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getSauce from '@features/sauce/queries/getSauce';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, sauce] = await getSauce({ id: +id });

  const sauceName = error ? '소스' : sauce?.name?.slice(0, 10) || '소스';

  return {
    title: `${sauceName} | ${BRAND_TITLE.EN}`,
    description: `${sauce?.name} 소스 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${sauceName} | ${BRAND_TITLE.EN}`,
      description: `${sauceName} 소스 페이지입니다.`,
      url: SITE_LINK,
      siteName: BRAND_TITLE.EN,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${sauceName} | ${BRAND_TITLE.EN}`,
      description: `${sauceName} 소스 페이지입니다.`,
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

const SauceDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default SauceDetailLayout;
