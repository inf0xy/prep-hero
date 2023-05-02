import { grayColors } from './extraStyles';

const getTotalDaysInFebruary = () => {
  const now = new Date();
  const year = now.getFullYear();
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return isLeapYear ? 29 : 28;
};

export type Month = {
  name: string;
  totalDays: number;
};

export const months = [
  { name: 'Jan', totalDays: 31 },
  { name: 'Feb', totalDays: getTotalDaysInFebruary() },
  { name: 'Mar', totalDays: 31 },
  { name: 'Apr', totalDays: 30 },
  { name: 'May', totalDays: 31 },
  { name: 'Jun', totalDays: 30 },
  { name: 'Jul', totalDays: 30 },
  { name: 'Aug', totalDays: 31 },
  { name: 'Sep', totalDays: 30 },
  { name: 'Oct', totalDays: 31 },
  { name: 'Nov', totalDays: 30 },
  { name: 'Dec', totalDays: 31 }
];

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const colorMaps: { [key: string]: string[] } = {
  light: ['#e0e0e0', '#2a8559', '#27ab6b', '#1dcf79', '#0cf283'],
  dark: [grayColors[600], '#2a8559', '#27ab6b', '#1dcf79', '#0cf283']
};

export const monthDays = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const endDay = new Date(year, month, daysInMonth).getDay();

  return { daysInMonth, startDay, endDay };
};

export const weeksInMonth = (month: number, year: number) => {
  const { daysInMonth, startDay, endDay } = monthDays(month, year);
  const firstWeek = Math.ceil((1 + 6 - startDay) / 7);
  const lastWeek = Math.ceil((daysInMonth + (6 - endDay)) / 7);

  return { firstWeek, lastWeek };
};

export const getHeatmapColor = (theme: string, value: number) => {
  if (value === 0) {
    return colorMaps[theme][0];
  } else if (value > 30) {
    return colorMaps[theme][4];
  } else if (value > 15) {
    return colorMaps[theme][3];
  } else if (value > 7) {
    return colorMaps[theme][2];
  } else {
    return colorMaps[theme][1];
  }
};
