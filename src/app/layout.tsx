import type { Metadata } from 'next';

import LayoutShell from '@widgets/user/layout-shell';

import { BRAND_TITLE } from '@consts/commons';
import { NANUM_GOTHIC, OPEN_SANS } from '@consts/font';

import './globals.css';

export const metadata: Metadata = {
  title: BRAND_TITLE.KO,
  description: `${BRAND_TITLE.KO} 의 공식 웹사이트 입니다다`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${NANUM_GOTHIC.className} ${OPEN_SANS.className} antialiased`}>
        <div className='relative flex h-dvh w-full flex-col'>
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
