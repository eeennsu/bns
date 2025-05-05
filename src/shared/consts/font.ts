import { Nanum_Gothic, Open_Sans, Nunito, Baloo_2, Gowun_Dodum } from 'next/font/google';

export const NANUM_GOTHIC = Nanum_Gothic({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nanum-gothic',
  weight: ['400', '700'],
});

export const OPEN_SANS = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '700'],
});

export const NUNITO = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

export const BALOO_2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baloo-2',
  display: 'swap',
});

export const GOWUN_DODUM = Gowun_Dodum({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gowun-dodum',
  display: 'swap',
});
