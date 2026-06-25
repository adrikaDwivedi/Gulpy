import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import StreakCard from "../components/Streak/StreakCard";
import StreakCalendar from "../components/Streak/StreakCalendar";
import StatsCard from "../components/Streak/StatsCard";
import GoalCompleteCard from "../components/Streak/GoalCompleteCard";
import { useEffect, useState } from "react";
import { getItem, KEYS } from "../storage/hydrationStorage";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "../utils/streakUtils";
import { wp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";

const Streaks = () => {
  const [waterLogs, setWaterLogs] = useState({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>June 2026</Text>
        <Text style={styles.subheading}>Daily Goal: 2500ml</Text>
        <StreakCard />

        <StreakCalendar />
        <StatsCard />

        <GoalCompleteCard />
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
