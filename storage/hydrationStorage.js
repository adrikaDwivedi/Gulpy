import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  DAILY_GOAL: "daily_goal",
  CURRENT_INTAKE: "current_intake",
  WATER_LOGS: "water_logs",
  WATER_LOG_ENTRIES: "water_log_entries",
  LAST_OPEN_DATE: "last_open_date",
  LAST_GOAL_DATE: "lastGoalDate",
  HAS_ONBOARDED: "hasOnboarded",
  REMINDER_TIMES: "reminder_times",
  SCHEDULED_REMINDER_IDS: "scheduled_reminder_ids",
  LAST_REMINDER_SCHEDULE_DATE: "last_reminder_schedule_date",
  REMINDERS_STOPPED_DATE: "reminders_stopped_date",
};

const assertStorageKey = (key, caller) => {
  if (key === null || key === undefined) {
    const message = `Storage ${caller} called with null/undefined key`;
    console.log(message);
    console.trace();
    throw new Error(message);
  }
};

export const saveItem = async (key, value) => {
  try {
    assertStorageKey(key, "saveItem");
    if (value === undefined) {
      console.log(`⚠️ saveItem("${key}") called with undefined value`);
      console.trace();
      return;
    }
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Save Error: ", error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("Get Error: ", error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Remove Error: ", error);
  }
};
export const isPlainObject = (value) => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};
