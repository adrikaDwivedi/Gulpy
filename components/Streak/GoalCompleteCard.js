import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const GoalCompletedCard = () => {
  return (
    <LinearGradient
      colors={["#123B78", "#0A2A57"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.icon}>
        <Ionicons
          name="checkmark-circle"
          size={38}
          color="#22D3A6"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Today's Goal Complete!
        </Text>

        <Text style={styles.subtitle}>
          2500 ml reached today
        </Text>

        <Text style={styles.caption}>
          Keep the streak alive 💧
        </Text>
      </View>
    </LinearGradient>
  );
};

export default GoalCompletedCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 40,

    borderRadius: 24,
    padding: 20,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#2C4E81",
  },

  icon: {
    marginRight: 16,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Sora-Bold",
  },

  subtitle: {
    color: "#A4C5ED",
    marginTop: 4,
    fontSize: 14,
    fontFamily: "Sora-Regular",
  },

  caption: {
    color: "#22D3A6",
    marginTop: 8,
    fontSize: 13,
    fontFamily: "Sora-SemiBold",
  },
});