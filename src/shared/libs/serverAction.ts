export const executeWithCapture = async <T extends unknown[], U>(
  feature: string,
  fn: (...args: T) => Promise<U>,
  ...args: T
): Promise<[null, U] | [Error, U]> => {
  console.log('executeWithCapture', feature);
  try {
    const result = await fn(...args);
    return [null, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error('알 수 없는 에러가 발생했습니다.'), null];
  }
};
