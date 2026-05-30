import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const AnimatedDrop = () => {
  return (
    <View>
       <Image source={require('../assets//water-droplet.png')} style={styles.logobg} />
    </View>
  )
}

export default AnimatedDrop

const styles = StyleSheet.create({
    logobg: {
   width: 50,
   height: 50,
   resizeMode: 'contain',
 },
})