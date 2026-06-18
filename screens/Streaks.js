import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import StreakCard from '../components/Streak/StreakCard'
import StreakCalendar from '../components/Streak/StreakCalendar'
import StatsCard from '../components/Streak/StatsCard'
import GoalCompleteCard from '../components/Streak/GoalCompleteCard' 


const Streaks = () => {
  return (
   <SafeAreaView style={styles.cont}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={styles.heading}>June 2026</Text>
    <Text style={styles.subheading}>Daily Goal: 2500ml</Text>
    <StreakCard/>


    <StreakCalendar/>
     <StatsCard/>
  
    <GoalCompleteCard/>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Streaks

const styles = StyleSheet.create({
    cont:{
        backgroundColor: '#050927'
    },
heading:{
    fontSize: 30,
    fontWeight:'600',
    color: '#fff',
    marginTop: 60,
    marginLeft: 22,
    fontFamily: 'Sora-Regular'
},
subheading:{
color: '#83b4f0',
fontSize: 16,
marginLeft: 22,
},
})