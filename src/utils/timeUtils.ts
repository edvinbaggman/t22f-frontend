import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import weekday from 'dayjs/plugin/weekday';

// Extend dayjs with the plugins
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(weekday);

export default function formatDateRelativeToNow(
  dateString: string | null | undefined,
  startingTime: string | null | undefined
): string {
  if (!dateString || !startingTime) return '** Date failed to load **';
  try {
    const dateObj = new Date(dateString);
    const inputDay = dayjs(dateObj, 'YYYY-MM-DD');
    const now = dayjs();
    const nowYMDFormat = now.format('YYYY-MM-DD');
    // const timeFormat = 'hh:mm A';
    const timeFormat = 'HH:mm';

    if (inputDay.isToday()) {
      return `Today ${startingTime}`;
    } else if (inputDay.isTomorrow()) {
      return `Tomorrow ${startingTime}`;
    } else if (
      inputDay.diff(nowYMDFormat, 'day') > 1 &&
      inputDay.diff(nowYMDFormat, 'day') < 7
    ) {
      return `${inputDay.format('dddd')} ${startingTime}`;
    } else if (
      inputDay.diff(nowYMDFormat, 'day') >= 7 &&
      inputDay.year() === now.year()
    ) {
      return `${inputDay.format('MMMM D')} ${startingTime}`;
    } else {
      return `${inputDay.format('YYYY MMMM D')} ${startingTime}`;
    }
  } catch (error) {
    console.log(error);
    return dateString;
  }
}
