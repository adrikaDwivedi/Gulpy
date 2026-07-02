import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { rf } from "../../utils/responsive";

const GoalCompletedCard = ({ dailyGoal, todayIntake, completed }) => {
  if (!completed) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#10295A", "#112d65"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.icon}>
        <Ionicons name="checkmark-circle" size={38} color="#22D3A6" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Today's Goal Complete!</Text>

        <Text style={styles.subtitle}>{`${dailyGoal} ml reached today`}</Text>

        <Text style={styles.caption}>Keep the streak alive 💧</Text>
      </View>
    </LinearGradient>
  );
};

export default GoalCompletedCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.xxl,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C4E81",
  },
  icon: {
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    color: "#A4C5ED",
    marginTop: Spacing.xs,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
  },
  caption: {
    color: "#22D3A6",
    marginTop: Spacing.sm,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semiBold,
  },
});
