export const SERVER_ERRORS = {
  UNEXPECTED_ERROR: '예상치 못한 서버 에러가 발생했습니다.',
};

export const ADMIN_ERRORS = {
  MISSING_ACCESS_TOKEN: '접근 토큰이 없습니다',
  INVALID_TOKEN_PAYLOAD: '유효하지 않은 토큰 정보입니다',
  INVALID_ACCESS_TOKEN: '유효하지 않은 접근 토큰입니다',
  UNAUTHORIZED: '인증되지 않았습니다.',
};

export const AUTH_ERRORS = {
  MISSING_USERNAME_OR_PASSWORD: '아이디 또는 비밀번호를 입력해주세요',
  ADMIN_NOT_FOUND: '관리자 계정을 찾을 수 없습니다',
  ID_OR_PASSWORD_INCORRECT: '아이디 또는 비밀번호가 일치하지 않습니다',
  MISSING_REFRESH_TOKEN: '갱신 토큰이 없습니다',
  REFRESH_TOKEN_EXPIRED: '갱신 토큰이 만료되었습니다',
  INVALID_TOKEN_PAYLOAD: '유효하지 않은 토큰 정보입니다',
  INVALID_REFRESH_TOKEN: '유효하지 않은 갱신 토큰입니다',
  REFRESH_FAILED: '토큰 갱신에 실패했습니다',
};

export const IMAGE_ERRORS = {
  FAILED_UPLOAD: '이미지 업로드 처리에 실패하였습니다.',
  MISSING_IMAGE_FILES: '업로드된 이미지 url이 없습니다.',
  MAX_COUNT_EXCEEDED: '최대 파일 개수를 초과하였습니다. 제거 후 다시 업로드해주세요.',
  NOT_FOUND: '이미지를 찾지 못했습니다.',
  MISSING_ID: '상세 아이디가 없습니다.',
  MISSING_FILE_DATA: '파일 데이터가 없습니다.',
  MISSING_REF_TABLE_TYPE: '이미지 파일이 참조될 데이터 타입이 없습니다.',
  FAILED_SAVE: '업로드된 이미지 저장에 실패하였습니다.',
};

export const BREAD_ERRORS = {
  CREATE_FAILED: '빵 생성에 실패했습니다.',
  MODIFY_FAILED: '빵 수정에 실패했습니다.',
  DELETE_FAILED: '빵 삭제에 실패했습니다.',
  MISSING_ID: '상세 아이디가 없습니다.',
  INVALID_ID: '잘못된 상세 아이디입니다.',
  NOT_FOUND_BREAD: '존재하지 않는 빵입니다.',
};

export const SAUCE_ERRORS = {
  CREATE_FAILED: '소스 생성에 실패했습니다.',
  MODIFY_FAILED: '소스 수정에 실패했습니다.',
  DELETE_FAILED: '소스 삭제에 실패했습니다.',
  MISSING_ID: '상세 아이디가 없습니다.',
  INVALID_ID: '잘못된 상세 아이디입니다.',
  NOT_FOUND_SAUCE: '존재하지 않는 소스입니다.',
};

export const EVENT_ERRORS = {
  CREATE_FAILED: '이벤트 생성에 실패했습니다.',
  MODIFY_FAILED: '이벤트 수정에 실패했습니다.',
  DELETE_FAILED: '이벤트 삭제에 실패했습니다.',
  MISSING_ID: '상세 아이디가 없습니다.',
  INVALID_ID: '잘못된 상세 아이디입니다.',
  NOT_FOUND_SAUCE: '존재하지 않는 이벤트입니다.',
  INVALID_DATE: '날짜 형식이 잘못되었습니다.',
  OVER_DATE: '시작 날짜는 종료 날짜보다 이전이어야 합니다.',
};
