import ConfigProviders from '@configs/providers';
import '@configs/setup';
import ClientSetup from '@configs/setup';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import RootPageContainer from '@widgets/user/RootPageContainer';

import { BRAND_TITLE, SITE_LINK } from '@consts/brand';
import { NANUM_GOTHIC, OPEN_SANS } from '@consts/font';

import './globals.css';

export const metadata: Metadata = {
  title: BRAND_TITLE.EN,
  description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
  keywords: [
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
  ],
  authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }], // TODO: 링크 추가
  openGraph: {
    title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
    url: 'https://yourwebsite.com',
    siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    title: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
    description: `${BRAND_TITLE.KO}의 공식 웹사이트입니다.`,
  },
  robots: {
    index: true,
    follow: true,
  },
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
