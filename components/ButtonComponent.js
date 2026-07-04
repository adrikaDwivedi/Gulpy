import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { wp, hp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { Radius } from "../theme/radius";

const ButtonComponent = ({
  onPress,
  label = "Get started",
  animated = true,
  textStyle,
}) => {
  if (!animated) {
    return (
      <View>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={[styles.btnText, textStyle]}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    const t = setTimeout(() => {
      buttonOpacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      });
      buttonScale.value = withRepeat(
        withSequence(
          withTiming(1.03, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      );
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [
        {
          scale: buttonScale.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={buttonStyle}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        {
          // merge styles and ensure textStyle.fontFamily takes precedence
        }
        <Text style={[styles.btnText, textStyle ?? {}]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  btn: {
    width: wp(80),
    maxWidth: 320,
    height: hp(7.5),
    backgroundColor: "#00cfff",
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    marginTop: Spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.semiBold,
    color: "#0a1628",
    textAlign: "center",
    lineHeight: rf(26),
  },
});
