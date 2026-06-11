import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularProgress({
  progress = 74,
  size = 180,
  dailyGoal,
  waterConsumed,
}) {
  const strokeWidth = 18;

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const animatedProgress = useSharedValue(0);

  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1200,
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference -
      (animatedProgress.value / 100) * circumference;

    return {
      strokeDashoffset,
    };
  });

  useAnimatedReaction(
    () => animatedProgress.value,
    (current) => {
      runOnJS(setDisplayProgress)(Math.round(current));
    }
  );

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Background Ring */}
        <Circle
          stroke="#1B3E72"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Animated Progress Ring */}
        <AnimatedCircle
          stroke="#16C8FF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.percent}>
          {displayProgress}%
        </Text>

        <Text style={styles.amount}>
          {waterConsumed}ml
        </Text>

        <Text style={styles.goal}>
          of {dailyGoal}ml
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  percent: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "700",
  },

  amount: {
    color: "#8FB8FF",
    fontSize: 22,
    marginTop: 5,
  },

  goal: {
    color: "#7090C9",
    marginTop: 4,
  },
});