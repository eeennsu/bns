import dayjs from 'dayjs';

export const dateFormat = (date: Date | string, { hasDyOfWeek = false } = {}) => {
  if (hasDyOfWeek) {
    return dayjs.tz(date).format('YYYY.MM.DD (ddd)');
  }

  return dayjs.tz(date).format('YYYY.MM.DD');
};
