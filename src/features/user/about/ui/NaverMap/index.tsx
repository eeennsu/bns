'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, type FC } from 'react';

import { GEO_DATA } from '@consts/brand';

import ResetPositionButton from './ResetPositionButton';

const MarkerTag = `
<div style="width:180px; text-align:center; padding:10px; background:#fff8f0; border:1px solid #d9bfa9; border-radius:40px; box-shadow:0 2px 6px rgba(0,0,0,0.15); font-family:sans-serif;">
  <div style="font-size:16px; font-weight:bold; color:#8B4513;">브레드엔소스</div>
</div>`;

const DEFAULT_ZOOM = 15;

const NaverMap: FC = () => {
  const mapRef = useRef<naver.maps.Map>(null);

  useEffect(() => {
    if (typeof window.naver === 'undefined') return;

    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(GEO_DATA.LAT, GEO_DATA.LON),
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.LARGE,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    mapRef.current = map;

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(GEO_DATA.LAT, GEO_DATA.LON),
      map: map,
    });

    const infoWindow = new window.naver.maps.InfoWindow({
      content: MarkerTag + '브레드엔소스' + '</div>',
      borderWidth: 0,
      backgroundColor: 'transparent',
    });

    infoWindow.open(map, marker);
  }, []);

  const resetPosition = () => {
    if (!mapRef.current) return;

    const bnsPosition = new naver.maps.LatLng(GEO_DATA.LAT, GEO_DATA.LON);

    mapRef.current.panTo(bnsPosition);
    mapRef.current.setZoom(DEFAULT_ZOOM);
  };

  return (
    <div className='relative'>
      <div id='map' style={{ width: '100%', height: '400px' }} />
      <ResetPositionButton onClick={resetPosition} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(NaverMap), { ssr: false });
