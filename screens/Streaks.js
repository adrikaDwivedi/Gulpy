import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import StreakCard from "../components/Streak/StreakCard";
import StreakCalendar from "../components/Streak/StreakCalendar";
import StatsCard from "../components/Streak/StatsCard";
import GoalCompleteCard from "../components/Streak/GoalCompleteCard";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getItem, KEYS } from "../storage/hydrationStorage";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "../utils/streakUtils";
import { getDateString } from "../utils/streakUtils";
import { wp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";

const Streaks = () => {
  const [waterLogs, setWaterLogs] = useState({});
  const [dailyGoal, setDailyGoal] = useState(0);
  const [todayIntake, setTodayIntake] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split("T")[0],
  );

  const loadLogs = async () => {
    const logs = (await getItem(KEYS.WATER_LOGS)) || {};
    const savedGoal = await getItem(KEYS.DAILY_GOAL);
    const savedIntake = await getItem(KEYS.CURRENT_INTAKE);
    const today = getDateString();
    const todayLog = logs[today] ?? {};
    const goalValue = todayLog.goal ?? savedGoal ?? 0;
    const intakeValue = Number(todayLog.intake ?? savedIntake ?? 0);

    setWaterLogs(logs);
    setDailyGoal(savedGoal ?? 0);
    setTodayIntake(intakeValue);
    setTodayCompleted(goalValue > 0 && intakeValue >= goalValue);
    setCurrentStreak(calculateCurrentStreak(logs));
    setLongestStreak(calculateLongestStreak(logs));
  };

  useEffect(() => {
    loadLogs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLogs();
    }, []),
  );

  const monthName = new Date(currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.xxl }}
      >
        <Text style={styles.heading}>{monthName}</Text>
        <Text style={styles.subheading}>Daily Goal: {dailyGoal}ml</Text>
        <StreakCard currentStreak={currentStreak} />

        <StreakCalendar />
        <StatsCard waterLogs={waterLogs} />

        <GoalCompleteCard
          dailyGoal={dailyGoal}
          todayIntake={todayIntake}
          completed={todayCompleted}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Streaks;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "#0a1628",
    flex: 1,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: "600",
    color: "#fff",
    marginTop: Spacing.xxl,
    marginLeft: Spacing.lg,
    fontFamily: FontFamily.regular,
  },
  subheading: {
    color: "#83b4f0",
    fontSize: FontSize.md,
    marginLeft: Spacing.lg,
    marginTop: Spacing.xs,
    fontFamily: FontFamily.regular,
  },
});
