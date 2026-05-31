import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";

const Tagline = () => {
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);

  const subtitleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(20);

  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(20);

  useEffect(() => {
    setTimeout(() => {
      titleOpacity.value = withTiming(1, {
        duration: 700,
      });
      titleY.value = withTiming(0, {
        duration: 700,
      });
    }, 2500);

    setTimeout(() => {
      subtitleOpacity.value = withTiming(1, {
        duration: 700,
      });
      subtitleY.value = withTiming(0, {
        duration: 700,
      });
    }, 3000);

    setTimeout(() => {
      taglineOpacity.value = withTiming(1, {
        duration: 700,
      });
      taglineY.value = withTiming(0, {
        duration: 700,
      });
    }, 3500);
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      {
        translateY: titleY.value,
      },
    ],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [
      {
        translateY: subtitleY.value,
      },
    ],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [
      {
        translateY: taglineY.value,
      },
    ],
  }));
  return (
    <View style={{ marginTop: 40 }}>
      <Animated.Text
        style={[
          {
            color: "#fff",
            fontSize: 25,
            alignSelf: "center",
            fontFamily: 'Sora-Bold'
          },
          titleStyle,
        ]}
      >
        Stay Hydrated,
      </Animated.Text>
      <Animated.Text
        style={[
          {
            color: "#00cfff",
            fontSize: 25,
            alignSelf: "center",
            fontFamily: 'Sora-Bold'
          },
          subtitleStyle,
        ]}
      >
        Stay Energized!
      </Animated.Text>
      <Animated.Text
        style={[
          {
            color: "#6b9acf",
            fontSize: 16,
            alignSelf: "center",
            fontFamily: 'Sora-Regular',
            marginTop: 10,
          },
          taglineStyle,
        ]}
      >
        Track every sip. Hit your daily goal.
      </Animated.Text>
    </View>
  );
};

export default Tagline;

const styles = StyleSheet.create({});
