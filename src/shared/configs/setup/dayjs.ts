'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import dayjsTimezone from 'dayjs/plugin/timezone';
import dayjsUtc from 'dayjs/plugin/utc';

const setupDayjs = () => {
  dayjs.extend(dayjsUtc);
  dayjs.extend(dayjsTimezone);

  dayjs.locale('ko');
  dayjs.tz.setDefault('Asia/Seoul');
};

export default setupDayjs;
