'use client';

import Script from 'next/script';
import type { FC } from 'react';

const NaverMapScript: FC = () => {
  return (
    <Script
      type='text/javascript'
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
      strategy='afterInteractive'
    />
  );
};

export default NaverMapScript;
