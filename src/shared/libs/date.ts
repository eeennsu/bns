import dayjs from 'dayjs';

export const dateFormat = (date: Date | string) => {
  return dayjs.tz(date).format('YYYY.MM.DD');
};
