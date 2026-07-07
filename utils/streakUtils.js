import { isPlainObject } from "../storage/hydrationStorage";

export const getDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (date, amount) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

export const buildCalendarStatuses = ({
  waterLogs = {},
  today = getDateString(),
  dailyGoal = 0,
} = {}) => {
  const logs = isPlainObject(waterLogs) ? waterLogs : {};
  const sortedDates = Object.keys(logs)
    .filter((date) => Boolean(date))
    .sort((a, b) => a.localeCompare(b));

  if (sortedDates.length === 0) {
    return {};
  }

  const calendar = {};
  const todayDate = new Date(today);
  // normalize to midday to avoid timezone/parsing edge-cases where
  // a Date created from 'YYYY-MM-DD' becomes midnight and compares
  // less-than a currentDate set to midday, skipping the final day.
  todayDate.setHours(12, 0, 0, 0);
  if (Number.isNaN(todayDate.getTime())) {
    return calendar;
  }

  const firstDate = new Date(sortedDates[0]);
  if (Number.isNaN(firstDate.getTime())) {
    return calendar;
  }

  let currentDate = new Date(firstDate);
  currentDate.setHours(12, 0, 0, 0);

  while (currentDate <= todayDate) {
    const dateKey = toDateKey(currentDate);
    const log = logs[dateKey]
      ? { ...logs[dateKey], goal: logs[dateKey].goal ?? dailyGoal }
      : { goal: dailyGoal, intake: 0 };

    if (dateKey < today) {
      calendar[dateKey] = isCompletedDay(log) ? "completed" : "missed";
    } else if (dateKey === today && isCompletedDay(log)) {
      calendar[dateKey] = "completed";
    }

    currentDate = addDays(currentDate, 1);
  }

  return calendar;
};

export const isCompletedDay = (log) => {
  if (!log) return false;
  const goal = Number(log.goal);
  const intake = Number(log.intake);
  if (!goal || goal <= 0) return false;
  return intake >= goal;
};

export const calculateCurrentStreak = (waterLogs) => {
  if (!waterLogs) return 0;

  let streak = 0;
  let currentDate = new Date();

  const todayStr = getDateString(currentDate);
  if (!isCompletedDay(waterLogs[todayStr])) {
    // today isn't finished yet — don't count it, don't kill the streak either
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const date = getDateString(currentDate);
    const log = waterLogs[date];

    if (!isCompletedDay(log)) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

export const calculateLongestStreak = (waterLogs) => {
  if (!waterLogs) return 0;

  const dates = Object.keys(waterLogs).sort();

  let longest = 0;
  let current = 0;
  let prevDate = null;

  dates.forEach((date) => {
    const log = waterLogs[date];

    if (!isCompletedDay(log)) {
      current = 0;
      prevDate = null;
      return;
    }

    if (!prevDate) {
      current = 1;
    } else {
      const prev = new Date(prevDate);
      const currentDate = new Date(date);

      const diff =
        (currentDate.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        current++;
      } else {
        current = 1;
      }
    }

    prevDate = date;
    longest = Math.max(longest, current);
  });

  return longest;
};
