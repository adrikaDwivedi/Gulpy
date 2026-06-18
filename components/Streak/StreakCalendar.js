import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'


const StreakCalendar = () => {
  return (
    <LinearGradient
    colors={["#10295A" , "#0C214B"]}
    start={{x:0 , y:0}}
    end={{x:1 , y:1}}
    style={styles.cont}
    >

      {/* header */}

      <View style={styles.header}>
        <TouchableOpacity style={styles.arrbtn}>
          <Ionicons
          name="chevron-back"
          size={24}
          color="#8EB9F5"
          />
        </TouchableOpacity>

        <Text style={styles.monthtxt}>June 2026</Text>

        <TouchableOpacity style={styles.arrbtn}>
    <Ionicons
    name='chevron-forward'
    size={24}
    color="#8EB9F5"
    />
        </TouchableOpacity>
      </View>

        <Calendar
  current={"2025-06-01"}
  hideArrows
  hideExtraDays={false}
  disableMonthChange
  firstDay={0}
  style={styles.calendar}
  theme={{
    backgroundColor: "transparent",
    calendarBackground: "transparent",

    // Hide default month
    monthTextColor: "transparent",

    // Weekdays
    textSectionTitleColor: "#7EA8DD",
    textDayHeaderFontFamily: "Sora-SemiBold",
    textDayHeaderFontSize: 16,

    // Days
    dayTextColor: "#FFFFFF",
    textDisabledColor: "#365886",

    textDayFontFamily: "Sora-Regular",
    textDayFontSize: 16,

    // Remove today's default styling
    todayTextColor: "#FFFFFF",

    // Hide default arrows
    arrowColor: "transparent",
  }}
/>
     
       </LinearGradient>
  )
}

export default StreakCalendar

const styles = StyleSheet.create({
  cont: {
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2D4F84",
    padding: 20,
  },

  placeholder: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 200,
    fontSize: 18,
    fontFamily: "Sora-Regular",
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
})