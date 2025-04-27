import { Noto_Sans_KR, Open_Sans } from 'next/font/google';

const NOTO_SANS_KR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
  weight: ['400', '700'],
});

const OPEN_SANS = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '700'],
});

const FONT = {
  NOTO_SANS_KR,
  OPEN_SANS,
};

export default FONT;
