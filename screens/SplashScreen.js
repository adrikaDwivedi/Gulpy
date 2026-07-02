import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import WaterBottle from "../components/WaterBottle";
import AnimatedDrop from "../components/AnimatedDrop";
import ProgressPill from "../components/ProgressPill";
import Tagline from "../components/Tagline";
import ButtonComponent from "../components/ButtonComponent";
import { getItem, KEYS } from "../storage/hydrationStorage";
import { wp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { getTodayDate } from "../utils/date";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserSetup = async () => {
      try {
        const hasOnboarded = await getItem(KEYS.HAS_ONBOARDED);
        const lastGoalDate = await getItem(KEYS.LAST_GOAL_DATE);

        const today = getTodayDate();

        if (!hasOnboarded) {
          navigation.reset({
            index: 0,
            routes: [{ name: "FirstUser" }],
          });
          return;
        }

        if (lastGoalDate === today) {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomePage" }],
          });
          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "FirstUser" }],
        });

        // const dailyGoal = await getItem(KEYS.DAILY_GOAL);
        // if (dailyGoal) {
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: "HomePage" }],
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    };

    checkUserSetup();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
      <Image source={require('../assets//water-droplet.png')} style={styles.logoImg} />
      </View> */}
      <View>
        <Text style={styles.title}>Gulpy</Text>
        <Text style={styles.paragraphs}>
          Your daily reminder to stay hydrated!
        </Text>
        {/* <View>
        <AnimatedDrop/>
      </View> */}
      </View>
      <View>
        <WaterBottle />
      </View>
      <ProgressPill />
      <Tagline />
      <ButtonComponent onPress={() => navigation.navigate("FirstUser")} />
    </SafeAreaView>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1628",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },
  logoImg: {
    width: 80,
    height: 200,
    resizeMode: "contain",
    marginTop: -150,
  },
  title: {
    color: "#fff",
    fontSize: rf(50),
    fontFamily: FontFamily.bold,
    textAlign: "center",
  },
  paragraphs: {
    color: "#fff",
    fontSize: FontSize.lg,
    marginTop: Spacing.md,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: rf(24),
    maxWidth: wp(80),
  },
});
