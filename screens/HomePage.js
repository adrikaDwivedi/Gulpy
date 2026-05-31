import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import GoalCard from '../components//GoalCard'
const HomePage = () => {
  
  const newDate = new Date();
return (
 <SafeAreaView style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.dateText}>{newDate.toString().slice(0, 16)}</Text>
     <Text style={styles.hydrationText}>Today's Hydration</Text>
    </View>
    <View style={styles.contentContainer}>
      <GoalCard />
    </View>
 </SafeAreaView>
  );
}

export default HomePage

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#0a1628',
  },
  headingContainer:{
    marginTop:20,
  },
  dateText:{
    color:'#6b9acf',
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
  },
  hydrationText:{
    fontSize: 30,
    fontFamily: 'Sora-ExtraBold',
    color: '#fff',
  },
})