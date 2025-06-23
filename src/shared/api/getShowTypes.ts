export const getShowTypes = (showType: 'all' | 'on' | 'off' | undefined) => {
  const isAllType = showType === 'all';
  const isOnType = showType === 'on';
  const isOffType = showType === 'off';

  return {
    isAllType,
    isOnType,
    isOffType,
  };
};
