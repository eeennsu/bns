import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getBread from '@features/bread/queries/getBread';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, bread] = await getBread({ id: +id });

  const breadName = error ? '빵' : bread?.name?.slice(0, 10) || '빵';

  return {
    title: `${breadName} | ${BRAND_TITLE.EN}`,
    description: `${bread?.name} 빵 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${breadName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${breadName} 빵 페이지입니다.`,
      url: SITE_LINK,
      siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${breadName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${breadName} 빵 페이지입니다.`,
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

const BreadDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default BreadDetailLayout;
