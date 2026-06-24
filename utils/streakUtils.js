export const getDateString = (date = new Date()) => {
  return date.toISOString().split("T")[0];
};

export const isCompletedDay = (log) => {
  if (!log) return false;

  return Number(log.intake) >= Number(log.goal);
};

export const calculateCurrentStreak = (waterLogs) => {
  if (!waterLogs) return 0;

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const date = getDateString(currentDate);

    const log = waterLogs[date];

    if (!isCompletedDay(log)) {
      break;
    }

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
        (currentDate.getTime() - prev.getTime()) /
        (1000 * 60 * 60 * 24);

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