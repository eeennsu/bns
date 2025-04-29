import type { Metadata } from 'next';

import Footer from '@widgets/layout/Footer';
import Header from '@widgets/layout/Header';

import FONT from '@consts/font';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bread & Sauce',
  description: 'Bread & Sauce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${FONT.NOTO_SANS_KR} ${FONT.OPEN_SANS} antialiased`}>
        <div className='flex min-h-dvh w-full flex-col bg-yellow-400'>
          <Header />
          <div className='flex-grow bg-amber-400'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
