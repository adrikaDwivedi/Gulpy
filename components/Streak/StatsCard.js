import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const stats = [
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

const StatsCards = ({stats}) => {
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
    marginHorizontal: 20,
    marginTop: 22,
  },

  card: {
    width: "31%",
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#2C4E81",
  },

  value: {
    fontSize: 28,
    fontFamily: "Sora-Bold",
    color: "#FFFFFF",
  },

  label: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: "Sora-Regular",
    color: "#82A8D8",
    textAlign: "center",
  },
});