import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

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
      });
      buttonScale.value = withRepeat(
        withSequence(
          withTiming(1.03, {
            duration: 1200,
          }),
          withTiming(1, {
            duration: 1200,
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
    width: 280,
    height: 70,
    backgroundColor: "#00cfff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 20,
  },
  btnText: {
    fontSize: 22,
    textAlign: "center",
    lineHeight: 50,
  },
});
