export const FILE_UPLOAD_TOAST_MESSAGES = {
  IMAGE_UPLOAD_SUCCESS: '이미지 업로드가 완료되었습니다.',
  FAILED_UPLOAD: '이미지 업로드 처리에 실패하였습니다.',
  MAX_COUNT_EXCEEDED: '최대 파일 개수를 초과하였습니다. 제거 후 다시 업로드해주세요.',
  NO_FILE: '파일을 선택되지 않았거나, 오류가 발생하였습니다. 관리자에게 문의해주세요',
  NO_IMAGE_IDS: '이미지 저장 처리에 실패하였습니다. 관리자에게 문의해주세요',
};

export const MAX_FILE_SIZE = '8MB';

export const IMAGE_REF_VALUES = {
  BREAD: 'bread',
  SAUCE: 'sauce',
  EVENT: 'event',
  BUNDLE: 'bundle',
  DISH: 'dish',
} as const;

export const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
