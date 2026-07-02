import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import CalendarLegend from "./CalendarLegend";
import { getItem, KEYS } from "../../storage/hydrationStorage";
import { getDateString } from "../../utils/streakUtils";
import { wp, rf } from "../../utils/responsive";
import { FontSize, FontFamily } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

const StreakCalendar = () => {
  const [streakData, setStreakData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split("T")[0],
  );

  const today = getDateString();

  const markedDates = useMemo(() => {
    const marks = {};

    Object.entries(streakData).forEach(([date, status]) => {
      if (status === "completed") {
        marks[date] = {
          customStyles: {
            container: {
              backgroundColor: "#3F8CFF",
              borderRadius: 20,
            },
            text: {
              color: "#FFFFFF",
              fontFamily: "Sora-Bold",
            },
          },
        };
      } else if (status === "missed") {
        marks[date] = {
          customStyles: {
            container: {
              backgroundColor: "transparent",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#FF5B5B",
            },
            text: {
              color: "#FF5B5B",
              fontFamily: "Sora-Bold",
            },
          },
        };
      }
    });

    if (!marks[today]) {
      marks[today] = {
        customStyles: {
          container: {
            borderWidth: 1,
            borderColor: "#5AA8FF",
            backgroundColor: "#173C73",
            borderRadius: 20,
          },
          text: {
            color: "#FFFFFF",
            fontFamily: "Sora-Bold",
          },
        },
      };
    }

    return marks;
  }, [streakData, today]);

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

  //   const dummyData = {
  //    "2026-06-02": "completed",
  // "2026-06-03": "completed",
  // "2026-06-05": "completed",
  // "2026-06-08": "completed",
  // "2026-06-10": "completed",
  // "2026-06-13": "completed",

  //   "2026-06-04": "missed",
  // "2026-06-09": "missed",
  // "2026-06-15": "missed",
  //   }

  const loadCalendar = async () => {
    const waterLogs = (await getItem(KEYS.WATER_LOGS)) || {};
    const todayGoal = await getItem(KEYS.DAILY_GOAL);

    const calendar = {};

    Object.entries(waterLogs).forEach(([date, day]) => {
      const goalValue = day.goal ?? todayGoal ?? 0;
      const completed = day.intake >= goalValue;

      if (date === today) {
        if (completed) {
          calendar[date] = "completed";
        }
        return;
      }

      if (date < today) {
        calendar[date] = completed ? "completed" : "missed";
      }
    });

    const todayLog = waterLogs[today];
    if (todayLog) {
      const todayGoalValue = todayLog.goal ?? todayGoal ?? 0;
      if (todayLog.intake >= todayGoalValue) {
        calendar[today] = "completed";
      }
    }

    setStreakData(calendar);
  };

  useFocusEffect(
    useCallback(() => {
      loadCalendar();
    }, []),
  );

  return (
    <LinearGradient
      colors={["#10295A", "#112d65"]}
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
          <Ionicons name="chevron-back" size={rf(24)} color="#8EB9F5" />
        </TouchableOpacity>

        <Text style={styles.monthtxt}>{monthName}</Text>

        <TouchableOpacity
          onPress={() => changeMonth("next")}
          style={styles.arrbtn}
        >
          <Ionicons name="chevron-forward" size={rf(24)} color="#8EB9F5" />
        </TouchableOpacity>
      </View>
      <View style={styles.weekRows}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
      </View>
      <Calendar
        current={currentMonth}
        onMonthChange={(month) =>
          setCurrentMonth(
            `${month.year}-${String(month.month).padStart(2, "0")}-01`,
          )
        }
        markingType="custom"
        markedDates={markedDates}
        hideArrows
        hideDayNames
        enableSwipeMonths
        showSixWeeks
        hideExtraDays={false}
        firstDay={0}
        hideDayNames={true}
        renderHeader={() => null}
        style={styles.calendar}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          monthTextColor: "transparent",
          textSectionTitleColor: "#7EA8DD",
          textDayHeaderFontFamily: FontFamily.semiBold,
          textDayHeaderFontSize: rf(10),
          dayTextColor: "#FFFFFF",
          textDisabledColor: "#365886",
          todayTextColor: "#FFFFFF",
          arrowColor: "transparent",
        }}
      />
      <CalendarLegend />
    </LinearGradient>
  );
};

export default StreakCalendar;

const styles = StyleSheet.create({
  cont: {
    marginHorizontal: Spacing.sm,
    marginTop: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: "#2D4F84",
    padding: Spacing.lg,
  },
  monthtxt: {
    color: "#FFFFFF",
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
  },
  arrbtn: {
    width: wp(13),
    height: wp(13),
    borderRadius: Radius.lg,
    backgroundColor: "#16376B",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  calendar: {
    backgroundColor: "transparent",
    width: "100%",
  },
  weekRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  weekText: {
    width: "14.28%",
    textAlign: "center",
    color: "#7EA8DD",
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.sm,
  },
});
