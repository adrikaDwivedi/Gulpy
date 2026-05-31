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

const ButtonComponent = ({onPress}) => {
  const buttonScale = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
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
    })
  ),
  -1,
  true
);
    }, 3000);
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
      <TouchableOpacity
        style={styles.btn}
        onPress={onPress}
      >
        <Text style={styles.btnText}>Get started</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  btn: {
    width: 300,
    height: 80,
    backgroundColor: "#00cfff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 40,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Sora-ExtraBold",
    alignSelf: "center",
    marginTop: 15,
  },
});
