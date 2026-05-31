import { StyleSheet,
Text,
View,
Image,
TouchableOpacity
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
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
import ProgressPill from '../components/ProgressPill'
import Tagline from '../components/Tagline'
import ButtonComponent from '../components/ButtonComponent'


const SplashScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}> 
    {/* <View>
      <Image source={require('../assets//water-droplet.png')} style={styles.logoImg} />
      </View> */}
      <View>
        <Text style={[styles.title , {fontFamily: 'Sora-ExtraBold'}]}>Gulpy</Text>
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
      <ProgressPill />
      <Tagline />
      <ButtonComponent onPress={() => navigation.navigate("HomePage")} />
    </SafeAreaView>
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
   fontFamily: 'Sora-ExtraBold',
   textAlign: 'center',
   },
  paragraphs: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
    marginBottom: 40,
   },
});
