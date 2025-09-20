import { differenceInCalendarDays, differenceInDays, format, formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { DATE_TIME_FORMAT_VIEW } from 'src/constants/constants';
export const formatDate = (value: string | null | undefined | Date, formatString: string = DATE_TIME_FORMAT_VIEW) => {
  if (!value) return '';

  try {
    const date = new Date(value);

    return format(date, formatString);
  } catch (error) {
    return '';
  }
};

function parseCustomLocaleDate(str: string) {
  const [datePart, timePart] = str.split(', ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [time, meridiem] = timePart.split(' ');
  let [hours, minutes, seconds] = time.split(':').map(Number);

  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes, seconds); // local time
}

export const formatDateUTCtoLocalTime = (value: string | null | undefined | Date, formatString: string = DATE_TIME_FORMAT_VIEW) => {
  if (!value) return undefined;

  try {
    const utcDate = new Date(value);
    const localTime = utcDate.toLocaleString();

    const dateObj = parseCustomLocaleDate(localTime);

    return dateObj;
  } catch (error) {
    return undefined;
  }
};

export const formatDateUTCtoLocalTimeView = (value: string | null | undefined | Date, formatString: string = DATE_TIME_FORMAT_VIEW) => {
  if (!value) return '';

  try {
    const utcDate = new Date(value);

    const localTime = utcDate.toLocaleString();

    return format(new Date(localTime), formatString);
  } catch (error) {
    return null;
  }
};

export const formatDateToUTC = (value: string | null | undefined | Date, formatString: string = 'yyyy-MM-dd HH:mm:ss') => {
  if (!value) return '';

  try {
    const date = new Date(value).toUTCString();

    return formatDate(new Date(date), formatString);
  } catch (error) {
    return '';
  }
};

export const formatDateDistance = (date?: string) => {
  if (!date) return '';

  return formatDistance(new Date(date), new Date(), { addSuffix: true, locale: vi });
};

export const daysBetween = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffInDays = differenceInCalendarDays(today, date);
  return diffInDays;
};

export const getDurationDate = (fromDate: string, toDate: string): number => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  return differenceInDays(to, from);
};
