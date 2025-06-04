export const getDeepValue = (obj: Record<string, any>, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};
