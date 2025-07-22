export const ADMIN_IMAGE_KEYS = {
  UPLOAD: 'UPLOAD_IMAGE',
};

export const FILE_UPLOAD_TOAST_MESSAGES = {
  IMAGE_UPLOAD_SUCCESS: '이미지 업로드가 완료되었습니다.',
  FAILED_UPLOADTHING: '원격 이미지 업로드 처리에 실패하였습니다.',
  FAILED_UPLOAD_API: '이미지 업로드 처리에 실패하였습니다.',
  MAX_COUNT_EXCEEDED: '최대 파일 개수를 초과하였습니다. 제거 후 다시 업로드해주세요.',
  NO_FILE: '파일을 선택되지 않았거나, 오류가 발생하였습니다. 관리자에게 문의해주세요',
  NO_IMAGE_IDS: '이미지 저장 처리에 실패하였습니다. 관리자에게 문의해주세요',
  IMAGE_TYPE_ERROR:
    '이미지 파일 형식이 올바르지 않습니다. 지원하는 파일 형식은 JPG, JPEG, PNG 형식을 사용해주세요.',
  FILE_TOO_LARGE: '8BM 이하의 이미지 파일만 업로드할 수 있습니다.',
};

export const MAX_FILE_SIZE = '8MB' as const;
export const MAX_FILE_SIZE_BYTES = parseInt(MAX_FILE_SIZE.replace('MB', ''), 10) * 1024 * 1024;

export const IMAGE_REF_VALUES = {
  BREAD: 'bread',
  SAUCE: 'sauce',
  EVENT: 'event',
  BUNDLE: 'bundle',
  DISH: 'dish',
  DRINK: 'drink',
} as const;

export const ALLOWED_FILE_TYPES = ['.jpg', '.png', '.jpeg', '.webp'];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
