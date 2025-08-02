export const ADMIN_BUNDLE_KEYS = {
  GET: 'GET_BUNDLE',
  GET_LIST: 'GET_BUNDLE_LIST',
  CREATE: 'CREATE_BUNDLE',
  MODIFY: 'MODIFY_BUNDLE',
  DELETE: 'DELETE_BUNDLE',
  GET_PRODUCT_LIST: 'GET_BUNDLE_PRODUCT_LIST',
};

export const MAIN_BUNDLE_KEYS = {};

export const BUNDLE_TOAST_MESSAGES = {
  CREATE_SUCCESS: '세트 구성이 정상적으로 등록되었습니다.',
  CREATE_FAILED: '세트 구성 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '세트 구성이 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '세트 구성 수정에 실패하였습니다.',
  DELETE_SUCCESS: '세트 구성이 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '세트 구성 삭제에 실패하였습니다.',
};

export const FAIL_MIN_QUANTITY_MESSAGE = '선택한 품목들의 총 수량은 2개 이상이어야 합니다.';

export const BUNDLE_TABLE_HEADERS = [
  '순서',
  '이름',
  '가격(원)',
  '할인된 가격(원)',
  '생성일',
  '숨김 여부',
  '삭제',
];

export const BUNDLE_PRODUCT_TYPE = {
  BREAD: 'bread',
  SAUCE: 'sauce',
  DISH: 'dish',
  DRINK: 'drink',
  DESSERT: 'dessert',
} as const;

export const BUNDLE_COMMAND_GROUP_HEADINGS = [
  {
    label: '빵',
    value: BUNDLE_PRODUCT_TYPE.BREAD,
  },
  {
    label: '소스',
    value: BUNDLE_PRODUCT_TYPE.SAUCE,
  },
  {
    label: '디쉬',
    value: BUNDLE_PRODUCT_TYPE.DISH,
  },
  {
    label: '음료',
    value: BUNDLE_PRODUCT_TYPE.DRINK,
  },
  {
    label: '디저트',
    value: BUNDLE_PRODUCT_TYPE.DESSERT,
  },
] as const;

export const ORDER_BY_SELECT = [
  '최신 등록순',
  '오래된 등록순',
  '정렬 빠른순',
  '정렬 느린순',
  '가격 낮은순',
  '가격 높은순',
];

export const BUNDLE_CONTEXT = {
  GET: 'GET_BUNDLE',
  GET_LIST: 'GET_BUNDLE_LIST',
  CREATE: 'CREATE_BUNDLE',
  MODIFY: 'MODIFY_BUNDLE',
  DELETE: 'DELETE_BUNDLE',
} as const;
