import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { BRAND_TITLE } from '@consts/brand';

export const metadata: Metadata = {
  title: `${BRAND_TITLE.EN} 이벤트 목록`,
  description: `${BRAND_TITLE.KO}의 이벤트 목록 페이지입니다.`,
  keywords: [...KEYWORDS],
  authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
  openGraph: {
    title: BRAND_TITLE.EN,
    description: `${BRAND_TITLE.KO}의 이벤트 목록 페이지입니다.`,
    url: SITE_LINK,
    siteName: BRAND_TITLE.EN,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    title: BRAND_TITLE.EN,
    description: `${BRAND_TITLE.KO}의 이벤트 목록 페이지입니다.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_LINK,
  },
};

const EventListLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default EventListLayout;
