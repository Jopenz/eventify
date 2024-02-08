import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

export const formatDate = (date: string) => {
  return dayjs.utc(date);
};
