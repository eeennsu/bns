import UtilLocalImage from '@utils/utilImage';

export const HERO_TITLE_DURATIONS = {
  DESCRIPTION: 0.2,
};

export const HERO_ANIM_DURATIONS = {
  IMAGE: HERO_TITLE_DURATIONS.DESCRIPTION + 0.5,
};

export const SITE_LINK = ''; // TODO: 링크 추가

export const BRAND_INFO = {
  TEL: '0507-1380-3068',
  LOCATION: '인천 서구 서곶로 45 B108호',
  MAIL: '보겸s이메일@naver.com',
  BUSINESS_HOURS: '매일 오전 8시 - 오후 8시',
};

export const BRAND_TRAFFIC = {
  BUS: '47번 국민 안전 체험관, 태산 아파트 하차',
  TRAIN: '인천2호선 가정중앙시장역 하차 후 3번 출구 도보 4분',
  CAR: `내비게이션에 '인천 광역시 서구 서곶로 45' 검색 후 린스트라우스 아파트 주차장을 이용해주세요. (7번 게이트 - B108호 브레드 앤 소스)`,
};

export const NAVER_MAP_DIRECTION_LINK =
  'https://map.naver.com/p/directions/-/14101672.0453735,4511924.8243708,%EB%B8%8C%EB%A0%88%EB%93%9C%EC%95%A4%EC%86%8C%EC%8A%A4,1522260182,PLACE_POI/-/transit?c=15.77,0,0,0,dh';

export const GEO_DATA = {
  LAT: 37.52062,
  LON: 126.67747,
};

export const BRAND_TITLE = {
  EN: 'Bread & Sauce',
  KO: '브래드앤소스',
} as const;

export const BUSINESS_INFO = {
  BUSINESS_NUMBER: {
    label: '사업자 등록번호',
    value: '123-45-67890',
  },
  REPRESENTATIVE: {
    label: '대표자명',
    value: '김현겸',
  },
  PHONE: {
    label: '전화번호',
    value: '010-1234-5678',
  },
} as const;

export const SNS_INFO = {
  INSTAGRAM: {
    URL: 'https://www.instagram.com/bread_n_sauce?igsh=MTF4Z3AzN3Jsanc1aw==',
    IMAGE_URL: UtilLocalImage.IMAGES.SNS.INSTAGRAM,
  },
  KAKAO: {
    URL: 'https://open.kakao.com',
    IMAGE_URL: UtilLocalImage.IMAGES.SNS.KAKAO,
  },
} as const;

export const MBTI_TYPE: string[] = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;
