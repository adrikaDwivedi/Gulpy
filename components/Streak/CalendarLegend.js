import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LegendItem = ({ color, borderColor, label }) => (
  <View style={styles.item}>
    <View
      style={[
        styles.dot,
        {
          backgroundColor: color,
          borderColor: borderColor || color,
          borderWidth: borderColor ? 2 : 0,
        },
      ]}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const CalendarLegend = () => {
  return (
    <View style={styles.container}>
      <LegendItem color="#3F8CFF" label="Completed" />

      <LegendItem
        color="transparent"
        borderColor="#FF5B5B"
        label="Missed"
      />
      

      <LegendItem
        color="#173C73"
        borderColor="#5AA8FF"
        label="Today"
      />
    </View>
  );
};

export default CalendarLegend;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },

  label: {
    color: "#B7D3FF",
    fontSize: 12,
    fontFamily: "Sora-Medium",
  },
});