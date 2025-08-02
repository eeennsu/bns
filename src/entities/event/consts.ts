export const ADMIN_EVENT_KEYS = {
  GET: 'GET_EVENT',
  GET_LIST: 'GET_EVENT_LIST',
  CREATE: 'CREATE_EVENT',
  MODIFY: 'MODIFY_EVENT',
  DELETE: 'DELETE_EVENT',
};

export const MAIN_EVENT_KEYS = {};

export const EVENT_TOAST_MESSAGES = {
  CREATE_SUCCESS: '이벤트가 정상적으로 등록되었습니다.',
  CREATE_FAILED: '이벤트 등록에 실패하였습니다.',
  MODIFY_SUCCESS: '이벤트가 정상적으로 수정되었습니다.',
  MODIFY_FAILED: '이벤트 수정에 실패하였습니다.',
  DELETE_SUCCESS: '이벤트가 정상적으로 삭제되었습니다.',
  DELETE_FAILED: '이벤트 삭제에 실패하였습니다.',
};

export const EVENT_TABLE_HEADERS = [
  '순서',
  '이름',
  '시작 일자',
  '종료 일자',
  '생성 일자',
  '숨김 여부',
  '삭제',
];

export const ORDER_BY_SELECT = ['최신 등록순', '오래된 등록순', '정렬 빠른순', '정렬 느린순'];

export const EVENT_CONTEXT = {
  GET: 'GET_EVENT',
  GET_LIST: 'GET_EVENT_LIST',
  CREATE: 'CREATE_EVENT',
  MODIFY: 'MODIFY_EVENT',
  DELETE: 'DELETE_EVENT',
};
