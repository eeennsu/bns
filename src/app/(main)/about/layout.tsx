import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import UtilLocalImage from '@shared/utils/utilImage';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { BRAND_TITLE } from '@consts/brand';

export const metadata: Metadata = {
  title: `${BRAND_TITLE.EN} Story`,
  description: `${BRAND_TITLE.KO}의 소개 페이지입니다.`,
  keywords: [...KEYWORDS],
  authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
  openGraph: {
    title: BRAND_TITLE.EN,
    description: `${BRAND_TITLE.KO}의 소개 페이지입니다.`,
    url: SITE_LINK,
    siteName: BRAND_TITLE.EN,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: UtilLocalImage.IMAGES.ABOUT.BG,
      },
      {
        url: UtilLocalImage.IMAGES.BREAD.LIST,
      },
      {
        url: UtilLocalImage.IMAGES.SAUCE.LIST,
      },
      {
        url: UtilLocalImage.IMAGES.DISH.LIST,
      },
      {
        url: UtilLocalImage.IMAGES.DRINK.LIST,
      },
      {
        url: UtilLocalImage.IMAGES.DESSERT.LIST,
      },
      {
        url: UtilLocalImage.IMAGES.BUNDLE.LIST,
      },
    ],
  },
  twitter: {
    title: BRAND_TITLE.EN,
    description: `${BRAND_TITLE.KO}의 소개 페이지입니다.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_LINK,
  },
};

const AboutLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default AboutLayout;
