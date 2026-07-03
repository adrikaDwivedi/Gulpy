import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import WaterBottle from "../components/WaterBottle";
import ProgressPill from "../components/ProgressPill";
import Tagline from "../components/Tagline";
import ButtonComponent from "../components/ButtonComponent";
import { getItem, KEYS } from "../storage/hydrationStorage";
import { wp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { getTodayDate } from "../utils/date";

const SplashScreen = ({ navigation }) => {
  const [nextRoute, setNextRoute] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkUserSetup = async () => {
      try {
        const hasOnboarded = await getItem(KEYS.HAS_ONBOARDED);
        const lastGoalDate = await getItem(KEYS.LAST_GOAL_DATE);
        const today = getTodayDate();

        if (!hasOnboarded) {
          setNextRoute("FirstUser");
        } else if (lastGoalDate === today) {
          setNextRoute("HomePage");
        } else {
          setNextRoute("FirstUser");
        }
      } catch (error) {
        console.log(error);
        setNextRoute("FirstUser");
      } finally {
        setIsReady(true);
      }
    };

    checkUserSetup();
  }, []);

  const handlePress = () => {
    if (!isReady || !nextRoute) return;
    navigation.reset({
      index: 0,
      routes: [{ name: nextRoute }],
    });
  };

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
      </View>
      <View>
        <WaterBottle />
      </View>
      <ProgressPill />
      <Tagline />
      <ButtonComponent
        onPress={handlePress}
        label={isReady ? "Continue" : "Loading..."}
        animated={isReady}
      />
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
