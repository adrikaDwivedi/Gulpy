import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CalendarDay = ({ date, state, status, isToday }) => {
  return (
    <View
      style={[
        styles.dayContainer,
        status == "completed" && styles.completedDay,
        status == "missed" && styles.missedDay,
        isToday &&
          status !== "completed" &&
          status !== "missed" &&
          styles.todayDay,

state === "disabled" && styles.disabledContainer,      ]}
    >
      <Text
        style={[
          styles.dayText,
          status === "completed" && styles.completedText,
          status === "missed" && styles.missedText,
          isToday &&
            status !== "completed" &&
            status !== "missed" &&
            styles.todayText,
          state === "disabled" && styles.disabledText,
        ]}
      >
        {date.day}
      </Text>
    </View>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  dayContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
  },

  disabledContainer: {
    opacity: 0.35,
  },

  disabledText: {
    color: "#6F8DB8",
  },
  completedDay: {
    backgroundColor: "#3F8CFF",
    borderRadius: 28,
    shadowColor: "#3F8CFF",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  completedText: {
    color: "#FFFFFF",
    fontFamily: "Sora-Bold",
  },
  todayDay: {
    backgroundColor: "#173C73",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#5AA8FF",
  },
  todayText: {
    color: "#FFFFFF",
    fontFamily: "Sora-Bold",
  },
  missedDay: {
    borderWidth: 1,
    borderColor: "#FF5B5B",
    borderRadius: 28,
    backgroundColor: "transparent",
  },

  missedText: {
    color: "#FF5B5B",
    fontFamily: "Sora-Bold",
  },
});
