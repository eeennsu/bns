import { BRAND_TITLE } from '@shared/consts/brand';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import UtilLocalImage from '@shared/utils/utilImage';
import { Metadata } from 'next';
import { Suspense, type FC, type PropsWithChildren, type ReactNode } from 'react';

interface IProps {
  modal: ReactNode;
}

export const metadata: Metadata = {
  title: `${BRAND_TITLE.EN} 상품 목록`,
  description: `${BRAND_TITLE.KO}의 상품 목록 페이지입니다.`,
  keywords: [...KEYWORDS],
  authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
  openGraph: {
    title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    description: `${BRAND_TITLE.KO}의 상품 목록 페이지입니다.`,
    url: SITE_LINK,
    siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    locale: 'ko_KR',
    type: 'website',
    images: [
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
    title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    description: `${BRAND_TITLE.KO}의 상품 목록 페이지입니다.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_LINK,
  },
};

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='container !gap-10 lg:!gap-20'>
      {children}
      <Suspense fallback={null}>{modal}</Suspense>
    </main>
  );
};

export default ProductLayout;
