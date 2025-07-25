export const ADMIN_DRINK_KEYS = {
  GET: 'GET_DRINK',
  GET_LIST: 'GET_DRINK_LIST',
  CREATE: 'CREATE_DRINK',
  MODIFY: 'MODIFY_DRINK',
  DELETE: 'DELETE_DRINK',
} as const;

export const MAIN_DRINK_KEYS = {};

export const DRINK_TOAST_MESSAGES = {
  CREATE_SUCCESS: '음료가 정상적으로 등록되었습니다.',
  CREATE_FAILED: '음료 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '음료가 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '음료 수정에 실패하였습니다.',
  DELETE_SUCCESS: '음료가 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '음료 삭제에 실패하였습니다.',
} as const;

export const DRINK_TABLE_HEADERS = [
  '순서',
  '이름',
  '가격(원)',
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
