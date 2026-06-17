import { StyleSheet, View, Image } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { wp, hp } from "../utils/responsive";
import { Spacing } from "../theme/spacing";

const WaterBottle = () => {
  const scale = useSharedValue(3);
  const opacity = useSharedValue(0);
  const ring = useSharedValue(1);
  const ring2 = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, {
      duration: 5000,
      easing: Easing.out(Easing.quad),
    });
    ring.value = withRepeat(
      withTiming(2, {
        duration: 2500,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false,
    );

    setTimeout(() => {
      ring2.value = withRepeat(
        withTiming(2, {
          duration: 2500,
          easing: Easing.out(Easing.ease),
        }),
        -1,
        false,
      );
    }, 1200);
  }, []);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 2 - ring.value,
      transform: [
        {
          scale: ring.value,
        },
      ],
    };
  });
  const bottleStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: scale.value,
        },
        // {
        //   rotate: `${rotation.value}deg`,
        // }
      ],
    };
  });

  const ringStyle2 = useAnimatedStyle(() => {
    return {
      opacity: 2 - ring2.value,
      transform: [
        {
          scale: ring2.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.ringWrapper}>
        <Animated.View style={[styles.rings, styles.ring1, ringStyle]} />
        <Animated.View style={[styles.rings, styles.ring2, ringStyle2]} />
        <View style={[styles.rings, styles.ring2, styles.ringStatic]} />
        <Animated.Image
          source={require("../assets//bottle_transparent.png")}
          style={[styles.bottleImg, bottleStyle]}
        />
      </View>
    </View>
  );
};

export default WaterBottle;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
  },
  ringWrapper: {
    width: wp(72),
    height: wp(72),
    alignItems: "center",
    justifyContent: "center",
  },
  bottleImg: {
    width: wp(72),
    height: wp(72),
    resizeMode: "contain",
    elevation: 0,
  },
  rings: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "rgba(0,180,255,0.15)",
    borderRadius: 999,
    alignSelf: "center",
  },
  ring1: {
    width: wp(42),
    height: wp(42),
  },
  ring2: {
    width: wp(58),
    height: wp(58),
  },
  ringStatic: {
    opacity: 0.2,
  },
});
