import {
  Nanum_Gothic,
  Open_Sans,
  Nunito,
  Baloo_2,
  Gowun_Dodum,
  Montserrat,
  Asta_Sans,
  // Gothic_A1,
  // Hahmlet
} from 'next/font/google';

export const NANUM_GOTHIC = Nanum_Gothic({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nanum-gothic',
  weight: ['400', '700'],
  preload: false,
});

export const OPEN_SANS = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '700'],
  preload: false,
});

export const NUNITO = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
});

export const BALOO_2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: false,
});

export const GOWUN_DODUM = Gowun_Dodum({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gowun-dodum',
  display: 'swap',
  preload: false,
});

export const MONTSERRAT = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
});

// export const GOTHIC_A1 = Gothic_A1({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-gothic-a1',
//   display: 'swap',
//   preload: false,
// });

// export const HAHMLET = Hahmlet({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-hahmlet',
//   display: 'swap',
//   preload: false,
// });

export const ASTA_SANS = Asta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-asta-sans',
  display: 'swap',
});
