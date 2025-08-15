import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getDish from '@features/dish/queries/getDish';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, dish] = await getDish({ id: +id });

  const dishName = error ? '디쉬' : dish?.name?.slice(0, 10) || '디쉬';

  return {
    title: `${dishName} | ${BRAND_TITLE.EN}`,
    description: `${dish?.name} 디쉬 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${dishName} | ${BRAND_TITLE.EN}`,
      description: `${dishName} 디쉬 페이지입니다.`,
      url: SITE_LINK,
      siteName: BRAND_TITLE.EN,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${dishName} | ${BRAND_TITLE.EN}`,
      description: `${dishName} 디쉬 페이지입니다.`,
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

const DishDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default DishDetailLayout;
