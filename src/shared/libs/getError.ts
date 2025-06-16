export const getErrorResponse = (error: any) => {
  return error?.response?.data?.error || '알 수 없는 에러가 발생하였습니다.';
};
