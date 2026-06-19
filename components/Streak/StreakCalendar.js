import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

const StreakCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("2026-06-20");

  const monthName = new Date(currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (direction) => {
    const date = new Date(currentMonth);
    if (direction === "next") {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setMonth(date.getMonth() - 1);
    }
    setCurrentMonth(date.toISOString().split("T")[0]);
  };

  return (
    <LinearGradient
      colors={["#10295A", "#0C214B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cont}
    >
      {/* header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => changeMonth("prev")}
          style={styles.arrbtn}
        >
          <Ionicons name="chevron-back" size={24} color="#8EB9F5" />
        </TouchableOpacity>

        <Text style={styles.monthtxt}>{monthName}</Text>

        <TouchableOpacity
          onPress={() => changeMonth("next")}
          style={styles.arrbtn}
        >
          <Ionicons name="chevron-forward" size={24} color="#8EB9F5" />
        </TouchableOpacity>
      </View>
        <View style={styles.weekRows}>
        {["Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat"].map(day =>(
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
        </View>
      <Calendar
        current={currentMonth}
        hideArrows
        enableSwipeMonths
        showSixWeeks
        hideExtraDays={false}
        firstDay={0}
        hideDayNames={true}
        style={styles.calendar}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",

          // Hide default month
          monthTextColor: "transparent",
          monthFontSize: 0,

          // Weekdays
          textSectionTitleColor: "#7EA8DD",
          textDayHeaderFontFamily: "Sora-SemiBold",
          textDayHeaderFontSize: 14,

          // Days
          dayTextColor: "#FFFFFF",
          textDisabledColor: "#365886",

          textDayFontFamily: "Sora-Regular",
          textDayFontSize: 14,

          // Remove today's default styling
          todayTextColor: "#FFFFFF",

          // Hide default arrows
          arrowColor: "transparent",
        }}
      />
    </LinearGradient>
  );
};

export default StreakCalendar;

const styles = StyleSheet.create({
  cont: {
    marginHorizontal: 12,
    marginTop: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2D4F84",
    padding: 20,
  },
  monthtxt: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Sora-Bold",
  },
  arrbtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16376B",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  calendar: {
  backgroundColor: "transparent",
  width: '100%',
},
weekRows: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: -30,
},
weekText: {
  width: "14.28%",
  textAlign: "center",
  color: "#7EA8DD",
  fontFamily: "Sora-SemiBold",
  fontSize: 14,
},
});
