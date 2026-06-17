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
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { rf } from "../utils/responsive";

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
        easing: Easing.out(Easing.exp),
      });
      titleY.value = withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      });
    }, 2500);

    setTimeout(() => {
      subtitleOpacity.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      });
      subtitleY.value = withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      });
    }, 3000);

    setTimeout(() => {
      taglineOpacity.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      });
      taglineY.value = withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.exp),
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
    <View style={styles.container}>
      <Animated.Text style={[styles.title, titleStyle]}>
        Stay Hydrated,
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, subtitleStyle]}>
        Stay Energized!
      </Animated.Text>
      <Animated.Text style={[styles.tagline, taglineStyle]}>
        Track every sip. Hit your daily goal.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  title: {
    color: "#fff",
    fontSize: FontSize.xl,
    alignSelf: "center",
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    color: "#00cfff",
    fontSize: FontSize.xl,
    alignSelf: "center",
    fontFamily: FontFamily.bold,
  },
  tagline: {
    color: "#6b9acf",
    fontSize: FontSize.sm,
    alignSelf: "center",
    fontFamily: FontFamily.regular,
    marginTop: Spacing.sm,
    lineHeight: rf(22),
  },
});

export default Tagline;
