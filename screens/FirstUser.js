import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from "react-native";
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  sendTestNotification,
} from "../services/Notifications";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PresetCard from "../components/PresetCard";
import Reminder from "../components/Reminder";
import ButtonComponent from "../components/ButtonComponent";
import { saveItem, KEYS } from "../storage/hydrationStorage";
import { wp, hp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { getTodayDate } from "../utils/date";

const FirstUser = ({ navigation }) => {
  const [goal, setGoal] = useState(2000);
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const newDate = new Date();
  const hours = newDate.getHours();

  const handleStart = async () => {
    try {
      const today = getTodayDate();

      await saveItem(KEYS.DAILY_GOAL, goal);
      await saveItem(KEYS.CURRENT_INTAKE, 0);
      await saveItem(KEYS.WATER_LOG_ENTRIES, []);
      await saveItem(KEYS.LAST_GOAL_DATE, today);
      await saveItem(KEYS.HAS_ONBOARDED, true);
      await saveItem(KEYS.LAST_OPEN_DATE, today);

      const granted = await requestNotificationPermission();

      if (granted) {
        await sendTestNotification();
      }
      console.log("Goal Saved: ", goal);
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={outerScrollEnabled}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.pageContent}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={rf(22)} color="#4dc1f7" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Set your daily goal</Text>
          </View>

          <View style={styles.subtitleWrapper}>
            <Text style={styles.subtitleText}>
              Drag the dial to pick the preset. You can always change this
              later.
            </Text>
          </View>

          <PresetCard
            goal={goal}
            setGoal={setGoal}
            setOuterScrollEnabled={setOuterScrollEnabled}
          />

          <Reminder />

          <View style={styles.buttonWrapper}>
            <ButtonComponent
              label="Let's start hydrating"
              animated={false}
              textStyle={{ fontFamily: FontFamily.regular }}
              onPress={handleStart}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FirstUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1628",
  },
  pageContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  headerText: {
    color: "#fff",
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    flex: 1,
    flexWrap: "wrap",
  },
  subtitleWrapper: {
    marginBottom: Spacing.lg,
  },
  subtitleText: {
    fontSize: FontSize.sm,
    color: "#fff",
    fontFamily: FontFamily.regular,
    lineHeight: rf(22),
  },
  backBtn: {
    width: wp(11),
    height: wp(11),
    borderWidth: 1,
    borderColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    marginRight: Spacing.md,
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
});
