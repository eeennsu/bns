import { Noto_Sans_KR, Open_Sans } from 'next/font/google'

export const notoSansKr = Noto_Sans_KR({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'fallback',
    subsets: ['latin'],
    style: 'normal',
    variable: '--noto-sans_KR-bold',
    fallback: ['system-ui'],
})

export const openSans = Open_Sans({
    weight: ['300', '400', '600', '700', '800'],
    display: 'fallback',
    subsets: ['latin'],
    style: 'normal',
    variable: '--open-sans-bold',
    fallback: ['system-ui'],
})
