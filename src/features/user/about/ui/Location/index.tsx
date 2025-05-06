import { Bus, Car, Clock, Mail, MapPin, Phone, Train } from 'lucide-react';
import type { FC } from 'react';

import { BRAND_INFO, BRAND_TRAFFIC, NAVER_MAP_DIRECTION_LINK } from '@consts/brand';

import LinkButton from '@components/LinkButton';

import NaverMap from '../NaverMap';
import ContactInfo from './ContactInfo';
import TransportInfo from './TransportInfo';

const Location: FC = () => {
  return (
    <section className='bg-ivory/70 rounded-xl p-8 shadow-sm lg:p-12'>
      <h2 className='text-wood mb-8 text-center text-3xl font-bold'>오시는 길</h2>

      <div className='grid items-start gap-8 lg:grid-cols-2'>
        <div>
          <div className='relative mb-6 h-[300px] overflow-hidden rounded-lg shadow-md lg:h-[400px]'>
            <NaverMap />
            {/* <Image
              src='https://picsum.photos/id/45/400/300'
              alt='지도'
              fill
              className='object-cover'
            /> */}
          </div>

          <div className='space-y-3'>
            <ContactInfo icon={<MapPin />} text={BRAND_INFO.LOCATION} />
            <ContactInfo icon={<Phone />} text={BRAND_INFO.TEL} />
            <ContactInfo icon={<Mail />} text={BRAND_INFO.MAIL} />
            <ContactInfo
              icon={<Clock />}
              text={
                <span className=''>
                  <span className='block leading-3'>{BRAND_INFO.BUSINESS_HOURS}</span>
                  <span className='text-wood/85/70 text-xs'>
                    ※ 대충 가게 사정에 따라 쉴수 있다는 말
                  </span>
                </span>
              }
            />
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-wood text-xl font-bold'>교통 안내</h3>

          <div className='space-y-6'>
            <TransportInfo icon={<Bus />} title='버스 이용 시' description={BRAND_TRAFFIC.BUS} />
            <TransportInfo
              icon={<Train />}
              title='지하철 이용 시'
              description={BRAND_TRAFFIC.TRAIN}
            />
            <TransportInfo icon={<Car />} title='자가용 이용 시' description={BRAND_TRAFFIC.CAR} />
          </div>

          <LinkButton
            href={NAVER_MAP_DIRECTION_LINK}
            target='_blank'
            rel='noopener noreferrer'
            variant='ivory'
            className='mt-4'
          >
            <MapPin />
            네이버지도로 길찾기
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Location;
