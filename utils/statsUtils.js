import { getDateString, isCompletedDay } from "./streakUtils";

export const getStats = (waterLogs = {}) => {
  const keys = Object.keys(waterLogs || {})
    .filter(Boolean)
    .sort();

  if (keys.length === 0) {
    return { daysHit: 0, missed: 0, successRate: 0 };
  }

  const firstDate = new Date(keys[0]);
  const todayStr = getDateString();
  const todayDate = new Date(todayStr);

  // normalize mid-day to avoid timezone issues
  firstDate.setHours(12, 0, 0, 0);
  todayDate.setHours(12, 0, 0, 0);

  let current = new Date(firstDate);
  const addDays = (d, n) => {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  };

  let daysHit = 0;
  let missed = 0;

  while (current <= todayDate) {
    const key = getDateString(current);
    const log = waterLogs[key] ?? { goal: 0, intake: 0 };

    if (key < todayStr) {
      if (isCompletedDay(log)) daysHit++;
      else missed++;
    } else if (key === todayStr) {
      if (isCompletedDay(log)) daysHit++;
    }

    current = addDays(current, 1);
  }

  const totalConsidered = daysHit + missed; // exclude today if not completed
  const successRate =
    totalConsidered === 0 ? 0 : Math.round((daysHit / totalConsidered) * 100);

  return { daysHit, missed, successRate };
};
