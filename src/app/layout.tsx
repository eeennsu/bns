import ConfigProviders from '@configs/providers';
import '@configs/setup';
import ClientSetup from '@configs/setup';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import RootPageContainer from '@widgets/user/RootPageContainer';

import getSignatureList from '@features/home/queries/getSignatureList';

import { BRAND_TITLE, SITE_LINK } from '@consts/brand';
import { NANUM_GOTHIC, OPEN_SANS } from '@consts/font';

import './globals.css';

export const generateMetadata = async (): Promise<Metadata> => {
  const [error, signatures] = await getSignatureList();

  const signatureNames = signatures?.map(item => item.name) || [];
  const signaturesImages =
    signatures?.slice(0, 10).map(item => ({
      url: item?.image || '',
      alt: item?.name || '',
    })) || [];

  return {
    title: BRAND_TITLE.EN,
    description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
    keywords: [
      '빵',
      '파스타',
      '잼',
      '가정동 빵집',
      '가정중앙시장',
      '기정중앙시장역',
      '수제 빵',
      '소스',
      '베이커리',
      'Bread & Sauce',
      '브레드엔소스',
      '브레드앤소스',
      '브래드엔소스',
      '브래드앤소스',
      '브레드 엔 소스',
      '브레드엔 소스',
      '브레드 앤소스',
      ...(error ? ['시그니처 빵'] : signatureNames),
    ],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
      url: SITE_LINK,
      siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      locale: 'ko_KR',
      type: 'website',
      images: error ? [] : signaturesImages,
    },
    twitter: {
      title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
      images: error ? [] : signaturesImages,
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

const RootLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <html lang='ko'>
      <body className={`${NANUM_GOTHIC.className} ${OPEN_SANS.className} antialiased`}>
        <ConfigProviders>
          <ClientSetup />
          <div className='relative flex h-dvh w-full flex-col'>
            <RootPageContainer>{children}</RootPageContainer>
          </div>
        </ConfigProviders>
      </body>
    </html>
  );
};

export default RootLayout;
