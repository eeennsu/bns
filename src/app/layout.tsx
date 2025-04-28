import type { Metadata } from 'next';

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
        <div className='min-h-dvh w-full'>{children}</div>hello zzzz
      </body>
    </html>
  );
}
