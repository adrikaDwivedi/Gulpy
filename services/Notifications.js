import * as Notifications from "expo-notifications";
import { saveItem, getItem, KEYS } from "../storage/hydrationStorage";
import { getTodayDate } from "../utils/date";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ---------------- 1. Permission request ----------------
export const requestNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
};

// ---------------- 2. Reminder notifications ----------------
/**
 * Schedules one-off notifications for each remaining reminder time today.
 * times: [{ hour, minute }, ...]
 *
 * NOTE: uses one-off DATE triggers instead of a recurring DAILY trigger,
 * because a recurring trigger can't be "paused for today only" — cancelling
 * it cancels it forever. One-off triggers let us stop today and reschedule
 * tomorrow independently.
 */
export const scheduleRemindersForToday = async (times) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!times || times.length === 0) {
    await saveItem(KEYS.SCHEDULED_REMINDER_IDS, []);
    return;
  }

  const now = new Date();
  const scheduledIds = [];

  for (const { hour, minute } of times) {
    const triggerDate = new Date();
    triggerDate.setHours(hour, minute, 0, 0);

    // Skip times that have already passed today
    if (triggerDate.getTime() <= now.getTime()) continue;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Time to hydrate!",
        body: "Your body is waiting for water.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });

    scheduledIds.push(id);
  }

  await saveItem(KEYS.SCHEDULED_REMINDER_IDS, scheduledIds);
  await saveItem(KEYS.LAST_REMINDER_SCHEDULE_DATE, getTodayDate());
};

// Kept for backward compatibility / manual single-time scheduling if needed
export const scheduleDailyReminder = async (hour, minute) => {
  await scheduleRemindersForToday([{ hour, minute }]);
};

// ---------------- 3. Stop reminders after goal reached ----------------
/**
 * Call this right after CURRENT_INTAKE is updated (wherever water is logged).
 */
export const stopRemindersIfGoalReached = async (currentIntake, goal) => {
  if (currentIntake < goal) return;

  const stoppedDate = await getItem(KEYS.REMINDERS_STOPPED_DATE);
  const today = getTodayDate();

  if (stoppedDate === today) return; // already stopped today, avoid redundant cancel calls

  await Notifications.cancelAllScheduledNotificationsAsync();
  await saveItem(KEYS.SCHEDULED_REMINDER_IDS, []);
  await saveItem(KEYS.REMINDERS_STOPPED_DATE, today);
};

// ---------------- 4. Restart reminders next day ----------------
/**
 * Call this once on app open/foreground, alongside your existing
 * day-rollover logic that resets CURRENT_INTAKE.
 */
export const restartRemindersForNewDay = async () => {
  const lastScheduled = await getItem(KEYS.LAST_REMINDER_SCHEDULE_DATE);
  const today = getTodayDate();

  if (lastScheduled === today) return; // already scheduled for today, don't duplicate

  const times = (await getItem(KEYS.REMINDER_TIMES)) || [];
  if (times.length === 0) return; // user never set reminder times, nothing to schedule

  await scheduleRemindersForToday(times);
};

export const sendTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 GULPY Test",
      body: "Drink some water!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
};