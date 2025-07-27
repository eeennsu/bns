export const ADMIN_DISH_KEYS = {
  GET: 'GET_DISH',
  GET_LIST: 'GET_DISH_LIST',
  CREATE: 'CREATE_DISH',
  MODIFY: 'MODIFY_DISH',
  DELETE: 'DELETE_DISH',
} as const;

export const MAIN_DISH_KEYS = {};

export const DISH_TOAST_MESSAGES = {
  CREATE_SUCCESS: '디쉬가 정상적으로 등록되었습니다.',
  CREATE_FAILED: '디쉬 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '디쉬가 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '디쉬 수정에 실패하였습니다.',
  DELETE_SUCCESS: '디쉬가 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '디쉬 삭제에 실패하였습니다.',
} as const;

export const DISH_TABLE_HEADERS = [
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

export const DISH_CATEGORY_SELECT = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];
