import { StyleSheet,
Text,
View,
Image,
TouchableOpacity
} from 'react-native'
import {useEffect} from 'react'
import Animated, {
useSharedValue,
useAnimatedStyle,
withTiming,
Easing,
runOnJS,
} from 'react-native-reanimated'
import WaterBottle from '../components/WaterBottle'
import AnimatedDrop from '../components/AnimatedDrop'

const SplashScreen = ({navigation}) => {

  return (
    <View style={styles.container}> 
    {/* <View>
      <Image source={require('../assets//water-droplet.png')} style={styles.logoImg} />
      </View> */}
      <View>
        <Text style={styles.title}>Gulpy</Text>
      {/* <View>
        <AnimatedDrop />
      </View> */}
      <Text style={styles.paragraphs}>Your daily reminder to stay hydrated!  
      </Text>
      {/* <View>
        <AnimatedDrop/>
      </View> */}
      </View>
      <View>
      <WaterBottle />
      </View>
      <View style={styles.coverBox}> 
        <Text style={styles.t1}>Filling up...72% done</Text>
        </View>
        <View style={{marginTop:40}}>
        <Text style={{
          color:"#fff" , 
          fontSize:25,
           alignSelf:'center'}}>Stay Hydrated,</Text>
        <Text style={{
          color: '#00cfff',
          fontSize: 25,
          alignSelf: 'center',
        }}>stay Energized!</Text>
        <Text style={{
          color: "#6b9acf",
          fontSize: 16,
          alignSelf: 'center',
          marginTop: 10,
        }}>Track every sip.Hit your daily goal</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.btnText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  
  
  
}

export default SplashScreen

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logoImg: {
   width: 80,
   height: 200,
   resizeMode: 'contain',
   marginTop:-150,
 },

  title: {
   color: "#fff",
   fontSize: 50,
   fontWeight: "500",
   fontFamily: 'Space Grotesk-Regular',
   textAlign: 'center',
   },
  paragraphs: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'DM Sans-Regular',
    textAlign: 'center',
    marginBottom: 40,
   },
   coverBox:{
    width: 170,
    height:35,
    backgroundColor: 'rgba(0,180,255,0.15)',
    borderRadius: 999,
    marginTop: 20,
   },
    t1: {
      color: "#00cfff",
      fontSize: 16,
      fontFamily: 'DM Sans-Regular',  
      marginTop:6,
      alignSelf: 'center',
    },
    btn:{
      width: 300,
      height:80,
      backgroundColor: '#00cfff',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 999,
      marginTop: 40,
    },
    btnText:{
      fontSize: 22,
      fontWeight: '800',
      fontFamily: 'DM Sans-Regular',
      alignSelf: 'center',
      marginTop: 15,
    },
    
});
