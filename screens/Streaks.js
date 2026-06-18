import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import StreakCard from '../components/Streak/StreakCard'
import StreakCalendar from '../components/Streak/StreakCalendar'
import StatsCard from '../components/Streak/StatsCard'
import GoalCompleteCard from '../components/Streak/GoalCompleteCard' 


const Streaks = () => {
  return (
   <SafeAreaView>
    <Text>Heading</Text>

    <StreakCard/>

    <StreakCalendar/>
    <StatsCard/>
    <GoalCompleteCard/>

   </SafeAreaView>
  )
}

export default Streaks

const styles = StyleSheet.create({
calendarCard:{
    backgroundColor:"#0F214D",
    borderRadius:28,
    borderWidth:1,
    borderColor:"#27487A",
    paddingVertical:18,
    paddingHorizontal:12
}
})