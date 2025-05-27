const PAGE_NAME_MAP = {
  bread: '빵',
  sauce: '소스',
  bundle: '세트 구성',
  event: '이벤트',
};

export const getAdminPageName = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean); // ['admin', ...]
  const rest = segments.slice(1); // ['product', 'bread', ...]

  if (rest.length === 0) return '';

  const last = rest[rest.length - 1];
  const prev = rest[rest.length - 2] || '';

  const isCreate = last === 'create';
  const isNumericId = /^\d+$/.test(last);

  let key = '';

  if (isCreate || isNumericId) {
    key = PAGE_NAME_MAP[prev] || prev;
  } else {
    key = PAGE_NAME_MAP[last] || last;
  }

  if (isCreate) {
    return `${key} 생성 페이지`;
  }

  if (isNumericId) {
    return `${key} 수정 페이지`;
  }

  return `${key} 목록 페이지`;
};
