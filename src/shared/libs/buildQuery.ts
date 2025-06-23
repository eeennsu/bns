export const filterQueryKeys = (...keys: unknown[]) => {
  return keys.filter(key => key !== '' && key !== undefined && key !== null);
};
