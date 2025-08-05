import { Bus, Car, Clock, Mail, MapPin, Phone, Train } from 'lucide-react';
import type { FC } from 'react';

import { BRAND_INFO, BRAND_TRAFFIC, NAVER_MAP_DIRECTION_LINK } from '@consts/brand';

import LinkButton from '@components/LinkButton';

import NaverMap from '../NaverMap';
import ContactInfo from './ContactInfo';
import TransportInfo from './TransportInfo';

const Location: FC = () => {
  return (
    <section className='flex flex-col gap-10 lg:pb-14'>
      <h2 className='text-center text-3xl font-bold tracking-tight text-black/80'>오시는 길</h2>

      <div className='grid items-start gap-10 lg:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <div className='overflow-hidden rounded-xl bg-white'>
            <div className='relative mb-6 h-[300px] overflow-hidden rounded-sm shadow-md lg:h-[400px]'>
              <NaverMap />
            </div>
          </div>

          <div className='rounded-xl bg-white'>
            <div className='ml-4 grid grid-cols-2 gap-4'>
              <ContactInfo icon={<MapPin />} text={BRAND_INFO.LOCATION} />
              <ContactInfo icon={<Phone />} text={BRAND_INFO.TEL} />
              <ContactInfo icon={<Mail />} text={BRAND_INFO.MAIL} />
              <ContactInfo icon={<Clock />} text={BRAND_INFO.BUSINESS_HOURS} />
            </div>
          </div>
        </div>

        <div className='flex h-full flex-col justify-center gap-12 pb-10'>
          <div className='flex flex-col gap-6'>
            <TransportInfo icon={<Bus />} title='버스 이용 시' description={BRAND_TRAFFIC.BUS} />
            <TransportInfo
              icon={<Train />}
              title='지하철 이용 시'
              description={BRAND_TRAFFIC.TRAIN}
            />
            <TransportInfo icon={<Car />} title='자가용 이용 시' description={BRAND_TRAFFIC.CAR} />
          </div>

          <div className='flex justify-center'>
            <LinkButton
              href={NAVER_MAP_DIRECTION_LINK}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-6 py-3 text-sm font-medium shadow-md'
              variant='modern'
            >
              <MapPin size={18} />
              네이버지도로 길찾기
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
