import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { wp, rf } from "../../utils/responsive";
import { FontSize, FontFamily } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";

const StreakCard = () => {
  return (
    <LinearGradient
      colors={["#082654", "#0A2A57"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="flame-outline" size={52} color="#FFF" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Current streak</Text>

        <View style={styles.daysRow}>
          <Text style={styles.number}>10</Text>
          <Text style={styles.days}>days</Text>
        </View>

        <Text style={styles.subtitle}>
          <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
          Goal hit every day!
        </Text>
      </View>
    </LinearGradient>
  );
};

export default StreakCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    ...Shadow.card,
  },
  iconContainer: {
    width: wp(21),
    height: wp(21),
    borderRadius: Radius.lg,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  label: {
    color: "#7DA7DF",
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.xs,
  },
  daysRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  number: {
    color: "#FFFFFF",
    fontSize: rf(64),
    fontFamily: FontFamily.bold,
    lineHeight: rf(68),
  },
  days: {
    color: "#00CFFF",
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    marginLeft: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: "#7DA7DF",
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    marginTop: Spacing.xs,
  },
});
