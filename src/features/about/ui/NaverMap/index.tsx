'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, type FC } from 'react';

import { GEO_DATA } from '@consts/brand';

import Loader from './Loader';
import ResetPositionButton from './ResetPositionButton';

const MarkerTag = `
<div class="w-[100px] sm:w-[120px] text-center px-4 sm:p-[10px] bg-black/80 border-ivory-tertiary border-3 rounded-full shadow-xl font-sans hover:opacity-0 transition-opacity duration-300">
  <div class="text-[10px] sm:text-[12px] font-bold text-ivory">브레드엔소스</div>
</div>`;

const DEFAULT_ZOOM = 15;

const NaverMap: FC = () => {
  const mapRef = useRef<naver.maps.Map>(null);

  useEffect(() => {
    if (typeof window.naver === 'undefined') return;

    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(GEO_DATA.LAT, GEO_DATA.LON),
      zoom: DEFAULT_ZOOM,
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
    if (!mapRef.current.getZoom()) return;

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

export default dynamic(() => Promise.resolve(NaverMap), {
  ssr: false,
  loading: () => <Loader />,
});
