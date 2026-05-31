import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated , {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedReaction,
    runOnJS,
} from 'react-native-reanimated'
import {useState , useEffect} from 'react'

const ProgressPill = () => {
    const [progress , setProgress] = useState(0);

    const pillY = useSharedValue(30);
    const pillOpacity = useSharedValue(0);
    const progressValue = useSharedValue(0);

    useEffect(() =>{
        pillY.value = withTiming(0 , {
            duration:1200,
        });

        pillOpacity.value = withTiming(1, {
            duration:1200,
        });

        progressValue.value = withTiming(72 , {
            duration:6000,
        });
        
    } , []);

    useAnimatedReaction(
    () => progressValue.value,
    (current) => {
      runOnJS(setProgress)(Math.floor(current));
    }
  );

  const pillStyle = useAnimatedStyle(() =>{
    return {
        opacity: pillOpacity.value,
        transform:[
            {
                translateY: pillY.value,
            },
        ],
    };
  });

  return (
   <Animated.View style={[styles.coverBox, pillStyle]}>
    <Text style={styles.t1}>Filling up... {progress}% done</Text>
   </Animated.View>
  )
}

export default ProgressPill

const styles = StyleSheet.create({
       coverBox:{
    width: 190,
    height:35,
    backgroundColor: 'rgba(0,180,255,0.15)',
    borderRadius: 999,
    marginTop: 20,
   },
    t1: {
      color: "#00cfff",
      fontSize: 16,
      fontFamily: 'Sora-Regular',  
      marginTop:6,
      alignSelf: 'center',
    },
})