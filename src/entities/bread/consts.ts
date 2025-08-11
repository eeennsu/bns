export const ADMIN_BREAD_KEYS = {
  GET: 'GET_BREAD',
  GET_LIST: 'GET_BREAD_LIST',
  CREATE: 'CREATE_BREAD',
  MODIFY: 'MODIFY_BREAD',
  DELETE: 'DELETE_BREAD',
} as const;

export const MAIN_BREAD_KEYS = {};

export const BREAD_TOAST_MESSAGES = {
  CREATE_SUCCESS: '빵이 정상적으로 등록되었습니다.',
  CREATE_FAILED: '빵 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '빵이 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '빵 수정에 실패하였습니다.',
  DELETE_SUCCESS: '빵이 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '빵 삭제에 실패하였습니다.',
} as const;

export const BREAD_TABLE_HEADERS = [
  '정렬 순서',
  '이름',
  '가격(원)',
  'MBTI',
  '시그니처 여부',
  '신메뉴 여부',
  '생성일',
  '공개 여부',
  '삭제',
];

export const ORDER_BY_SELECT = [
  '최신 등록순',
  '오래된 등록순',
  '정렬 빠른순',
  '정렬 느린순',
  '가격 낮은순',
  '가격 높은순',
];

export const BREAD_CATEGORY_SELECT = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];

export const BREAD_CONTEXT = {
  GET: 'GET_BREAD',
  GET_LIST: 'GET_BREAD_LIST',
  CREATE: 'CREATE_BREAD',
  MODIFY: 'MODIFY_BREAD',
  DELETE: 'DELETE_BREAD',
} as const;

export const BREAD_CACHE_TAG = {
  GET: 'GET_BREAD',
  GET_LIST: 'GET_BREAD_LIST',
};

export const MBTI_MAP = [
  { left: { type: 'I', name: '내향' }, right: { type: 'E', name: '외향' } },
  { left: { type: 'N', name: '직관' }, right: { type: 'S', name: '감각' } },
  { left: { type: 'F', name: '감정' }, right: { type: 'T', name: '사고' } },
  { left: { type: 'P', name: '인식' }, right: { type: 'J', name: '판단' } },
];
