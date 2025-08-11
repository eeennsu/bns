import '@configs/setup';
import { KEYWORDS, SITE_LINK } from '@shared/consts/seo';
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import getEvent from '@features/event/queries/getEvent';

import { BRAND_TITLE } from '@consts/brand';

interface IParams {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
  const { id } = await params;
  const [error, event] = await getEvent({ id: +id });

  const eventName = error ? '이벤트' : event?.name?.slice(0, 10) || '이벤트';

  return {
    title: `${eventName} | ${BRAND_TITLE.EN}`,
    description: `${event?.name} 이벤트 페이지입니다.`,
    keywords: [...KEYWORDS],
    authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
    openGraph: {
      title: `${eventName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${eventName} 이벤트 페이지입니다.`,
      url: SITE_LINK,
      siteName: `${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: `${eventName} | ${BRAND_TITLE.KO} | ${BRAND_TITLE.EN}`,
      description: `${eventName} 이벤트 페이지입니다.`,
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

const EventDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default EventDetailLayout;
