import { StyleSheet,
Text,
View,
Image
} from 'react-native'
import {useEffect} from 'react'
import Animated, {
useSharedValue,
useAnimatedStyle,
withTiming,
Easing,
runOnJS,
} from 'react-native-reanimated'


const SplashScreen = ({navigation}) => {

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() =>{
    scale.value = withTiming(
      1,
      {
        duration:1200,
        easing: Easing.out(Easing.exp)
      }
    );

    opacity.value = withTiming(
      1,
      {
        duration: 1500,
      }
    );

    setTimeout(()=>{
      navigation.navigate('HomePage');
    } , 2500);
  } , []);

  const logoStyle= useAnimatedStyle(() =>({
    transform:[
      {
        scale: scale.value
      }
    ]
  }));

  const textStyle= useAnimatedStyle(() => ({
    opacity: opacity.value
  }));
  return (
    <View style={styles.container}>
      
      <Animated.Image
      source={require('../assets//water-droplet.png')}
      style={[styles.logoImg , logoStyle]}
      >

      </Animated.Image>

      <Animated.Text
      style={[
        styles.title,
        textStyle
      ]}
      >
        Gulpy
      </Animated.Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logoImg: {
   width: 600,
   height: 600,
   resizeMode: 'contain',
 },
  title: {
   color: "#000",
   fontSize: 50,
   fontWeight: "500",
   marginTop: 0,
   fontFamily: 'Poppins-Regular',
   textAlign: 'center',
   marginBottom: 0,
   marginTop: -100,
   textShadowColor: '#000',
   textShadowOffset: { width: 0, height: 2 },
   textShadowRadius: 4,
   elevation: 5,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   },
  text: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
   fontFamily: 'Poppins-Regular',
   textAlign: 'center',
   textShadowColor: '#000',
   textShadowOffset: { width: 0, height: 2 },
   textShadowRadius: 4,
   elevation: 5,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   },
});
