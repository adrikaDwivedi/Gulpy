import { StyleSheet, Text, View, Image} from 'react-native'
import {useEffect} from 'react'
import Animated , {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'

const WaterBottle = () => {

  const scale = useSharedValue(3);
  const opacity = useSharedValue(0);
  const ring = useSharedValue(1);
  const ring2 = useSharedValue(1);

  useEffect (( ) =>{
    scale.value = withTiming(1,{
      duration: 5000,
    });
    opacity.value = withTiming(1,{
      duration: 5000,
    });
    ring.value = withRepeat(
      withTiming(2, {
        duration:2500,
      }),
      -1,
      false
    );

    setTimeout(() => {
      ring2.value = withRepeat(
        withTiming(2, {
          duration: 2500,
        }),
        -1,
        false
        );
    } , 1200)
  } , [])

  const ringStyle = useAnimatedStyle(() =>{
    return {
      opacity: 2-ring.value,
      transform:[
        {
          scale: ring.value,
        },
      ],
    };
  });
  const bottleStyle = useAnimatedStyle(() =>{
    return {
      opacity: opacity.value,
      transform:[
        {
          scale:scale.value,
        },
        // {
        //   rotate: `${rotation.value}deg`,
        // }
      ],
  };
  });

  const ringStyle2 = useAnimatedStyle(() =>{
    return {
      opacity: 2 - ring2.value,
      transform:[
        {
          scale: ring2.value,
        }
      ]
    }
  })



  return (
    <View style={styles.container}>
       <Animated.View
       style={[styles.rings,
        styles.ring1,
        ringStyle]}/>

        <Animated.View
       style={[
        styles.rings ,
         styles.ring2 , 
         ringStyle2]}/>

       
        <View style={[styles.rings , styles.ring2]}/>
      {/* <Image source={require('../assets//bottle_transparent.png')} style={styles.bottleImg} /> */}
      <Animated.Image 
      source={require('../assets//bottle_transparent.png')}
      style={[styles.bottleImg , bottleStyle]}
      />
    </View>
  )
}

export default WaterBottle

const styles = StyleSheet.create({
    // container:{
    // alignItems: "center",
    //  justifyContent: "center",
    //  top: 0,
    // },
    bottleImg: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: -25,
    elevation:0,
    },
    rings: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "rgba(0,180,255,0.15)",
    borderRadius: 999,
   
  },
    ring1: {
    width: 160,
    height: 160,
    marginLeft:70,
    marginTop: 60,
    
  },

  ring2: {
    width: 220,
    height: 220,
    marginLeft: 38,
    marginTop: 33,
  },
})