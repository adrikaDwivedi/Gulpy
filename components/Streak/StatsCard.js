import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { wp, rf } from "../../utils/responsive";
import { FontSize, FontFamily } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

const statsData = [
  {
    value: "24",
    label: "Days Hit",
  },
  {
    value: "4",
    label: "Missed",
  },
  {
    value: "80%",
    label: "Success Rate",
  },
];

const StatsCards = ({ stats = statsData }) => {
  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#123B78", "#0A2A57"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

export default StatsCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C4E81",
  },
  value: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
  },
  label: {
    marginTop: Spacing.xs,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: "#82A8D8",
    textAlign: "center",
  },
});
