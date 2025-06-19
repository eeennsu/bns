export const ADMIN_BREAD_KEYS = {
  GET: 'GET_BREAD',
  GET_LIST: 'GET_BREAD_LIST',
  CREATE: 'CREATE_BREAD',
  MODIFY: 'MODIFY_BREAD',
  DELETE: 'DELETE_BREAD',
};

export const MAIN_BREAD_KEYS = {};

export const BREAD_TOAST_MESSAGES = {
  CREATE_SUCCESS: '빵이 정상적으로 등록되었습니다.',
  CREATE_FAILED: '빵 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '빵이 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '빵 수정에 실패하였습니다.',
  DELETE_SUCCESS: '빵이 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '빵 삭제에 실패하였습니다.',
};

export const BREAD_TABLE_HEADERS = [
  '순서',
  '이름',
  '가격',
  'MBTI',
  '시그니처 여부',
  '신메뉴 여부',
  '생성일',
  '숨김 여부',
  '삭제',
];
