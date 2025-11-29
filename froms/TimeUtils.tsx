export const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
export const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];


export const timeRanges = [
  { start: { hour: 8, minute: 20 }, end: { hour: 9, minute: 50 }, lesson: 0 },
  { start: { hour: 10, minute: 0 }, end: { hour: 12, minute: 0 }, lesson: 1 },
  { start: { hour: 12, minute: 5 }, end: { hour: 13, minute: 40 }, lesson: 2 },
  { start: { hour: 13, minute: 40 }, end: { hour: 15, minute: 25 }, lesson: 3 },
  { start: { hour: 15, minute: 35 }, end: { hour: 17, minute: 0 }, lesson: 4 },
  { start: { hour: 17, minute: 10 }, end: { hour: 18, minute: 40 }, lesson: 5 },
  { start: { hour: 18, minute: 45 }, end: { hour: 20, minute: 0 }, lesson: 6 },
  { start: { hour: 20, minute: 10 }, end: { hour: 21, minute: 30 }, lesson: 7 },
];

export function isOddWeek(): boolean {
  const currentDate = new Date();
  var yearStart = new Date(currentDate.getFullYear(), 0, 1);
  var weekStart = new Date(yearStart.getTime());
  var dayOfWeek = yearStart.getDay();

  if (dayOfWeek !== 0) {
    weekStart.setDate(1 + (7 - dayOfWeek));
  }
  var diff = currentDate.getTime() - weekStart.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay) + 1;

  var weekNum = Math.floor((dayOfYear - 1) / 7) + 1;
  var isOddWeekRes = weekNum % 2 === 1;
  return isOddWeekRes;
}

export function getCurrLesson(): number {
  var date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let currLesson = -1;
  for (const range of timeRanges) {
    const { start, end, lesson } = range;
    const isWithinRange =
      (hours > start.hour ||
        (hours === start.hour && minutes >= start.minute)) &&
      (hours < end.hour || (hours === end.hour && minutes < end.minute));

    if (isWithinRange) {
      currLesson = lesson;
      break;
    }
  }

  return currLesson;
}

export function timeToString(time: any) {
  let hours = time.hour;
  let minutes = time.minute;
  let hoursStr;
  let minutesStr;
  if (hours < 10) {
    hoursStr = "0" + hours;
  } else {
    hoursStr = `${hours}`;
  }
  if (minutes < 10) {
    minutesStr = "0" + minutes;
  } else {
    minutesStr = `${minutes}`;
  }

  return `${hoursStr + ":" + minutesStr}`;
}