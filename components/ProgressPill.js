import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import { wp, hp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { Radius } from "../theme/radius";

const ProgressPill = () => {
  const [progress, setProgress] = useState(0);

  const pillY = useSharedValue(30);
  const pillOpacity = useSharedValue(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    pillY.value = withTiming(0, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });

    pillOpacity.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });

    progressValue.value = withTiming(72, {
      duration: 6000,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  useAnimatedReaction(
    () => progressValue.value,
    (current) => {
      runOnJS(setProgress)(Math.floor(current));
    },
  );

  const pillStyle = useAnimatedStyle(() => {
    return {
      opacity: pillOpacity.value,
      transform: [
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
  );
};

export default ProgressPill;

const styles = StyleSheet.create({
  coverBox: {
    width: wp(52),
    maxWidth: 260,
    height: hp(4.5),
    backgroundColor: "rgba(0,180,255,0.15)",
    borderRadius: Radius.full,
    marginTop: Spacing.lg,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  t1: {
    color: "#00cfff",
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    alignSelf: "center",
    lineHeight: rf(22),
  },
});
