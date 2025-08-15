import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getBundle from '@features/bundle/queries/getBundle';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, bundle] = await getBundle({ id: +id });

  const bundleName = error ? '세트 구성' : bundle?.name?.slice(0, 10) || '세트 구성';

  return {
    title: BRAND_TITLE.EN,
    description: `${bundle?.name} 세트 구성 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${bundleName} | ${BRAND_TITLE.EN}`,
      description: `${bundleName} 세트 구성 페이지입니다.`,
      url: SITE_LINK,
      siteName: BRAND_TITLE.EN,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${bundleName} | ${BRAND_TITLE.EN}`,
      description: `${bundleName} 세트 구성 페이지입니다.`,
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

const BundleDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default BundleDetailLayout;
