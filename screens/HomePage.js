import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalCard from "../components//GoalCard";
import QuickAddSection from "../components//QuickAddSection";
import CustomLogs from "../components/CustomLogs";
import { saveItem, getItem, KEYS } from "../storage//hydrationStorage.js";
import { wp, hp, rf } from "../utils/responsive";
import { FontSize, FontFamily } from "../theme/typography";
import { Spacing } from "../theme/spacing";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import Streaks from "./Streaks.js";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getDateString,
} from "../utils/streakUtils";

const HomePage = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [currentStreak , setCurrentStreak] = useState(0);

  const progress = dailyGoal
    ? Math.min((waterConsumed / dailyGoal) * 100, 100)
    : 0;

  const remaining = Math.max(dailyGoal - waterConsumed, 0);

  const addWater = async (amount) => {
    try {
      const updatedWater = Math.min(waterConsumed + amount, dailyGoal);

      setWaterConsumed(updatedWater);

      await saveItem(KEYS.CURRENT_INTAKE, updatedWater);


     const today = getDateString();

      const waterLogs = (await getItem(KEYS.WATER_LOGS)) || {};

      waterLogs[today] = {
        goal: dailyGoal,
        intake: updatedWater,
      };

      await saveItem(KEYS.WATER_LOGS, waterLogs);

            //// streak 
      const streak = calculateCurrentStreak(waterLogs);
      setCurrentStreak(streak);

      const newLog = {
        id: Date.now().toString(),
        amount,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "Water",
      };

      setLogs((prev) => {
        const updatedLogs = [newLog, ...prev];
        saveLogs(updatedLogs);
        return updatedLogs;
      });

      console.log("Saved Intake:", updatedWater);
    } catch (error) {
      console.log(error);
    }
  };

  const saveLogs = async (logsToSave) => {
    try {
      await saveItem(KEYS.WATER_LOG_ENTRIES, logsToSave);
      console.log("Logs saved:", logsToSave);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLogs = async () => {
    try {
      const savedLogs = await getItem(KEYS.WATER_LOG_ENTRIES);
      if (savedLogs) {
        setLogs(savedLogs);
        console.log("Loaded Logs:", savedLogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCurrentIntake = async () => {
    try {
      const savedIntake = await getItem(KEYS.CURRENT_INTAKE);

      if (savedIntake !== null) {
        setWaterConsumed(savedIntake);

        console.log("Loaded Intake:", savedIntake);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomAdd = () => {
    const amount = Number(customAmount);

    if (!amount || amount <= 0) {
      return;
    }
    addWater(amount);
    setCustomAmount("");
  };
  const newDate = new Date();

  const loadGoal = async () => {
    try {
      const savedGoal = await getItem(KEYS.DAILY_GOAL);
      console.log("Goal Retrieved: ", savedGoal);
      if (savedGoal !== null) {
        setDailyGoal(savedGoal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCurrentStreak = async () => {
  try {
    const waterLogs = await getItem(KEYS.WATER_LOGS);

    const streak = calculateCurrentStreak(waterLogs);

    setCurrentStreak(streak);
  } catch (error) {
    console.log(error);
  }
};

const checkDailyReset = async () =>{
  try {
    const today = getDateString();
    const lastOpenDate = await getItem(KEYS.LAST_OPEN_DATE);

    if(today !== lastOpenDate){
      await saveItem(KEYS.CURRENT_INTAKE , 0);
      setWaterConsumed(0);
      await saveItem(KEYS.LAST_OPEN_DATE, today)
    }
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
   const initializeApp = async() =>{ 
    await checkDailyReset(),

    await loadGoal();
    await loadCurrentIntake();
    await loadLogs();
    await loadCurrentStreak();
   }
   initializeApp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <View style={styles.textSection}>
            <Text style={styles.dateText}>
              {newDate.toString().slice(0, 16)}
            </Text>
            <Text style={styles.hydrationText}>Today's Hydration</Text>
          </View>
          <View style={styles.streaksSection}>
            <TouchableOpacity onPress={() => navigation.navigate("Streaks")}>
              <Ionicons name="flame-outline" size={rf(50)} color="#ed7321" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <GoalCard
            dailyGoal={dailyGoal}
            progress={progress}
            waterConsumed={waterConsumed}
            remaining={remaining}
          />
          <QuickAddSection onAddWater={addWater} />

          {/* custom-input-section */}

          <View>
            <View style={styles.customInputContainer}>
              <Text style={styles.dropIcon}>💧</Text>

              <TextInput
                style={styles.txtInput}
                placeholder="Custom amount (ml)..."
                placeholderTextColor="#6b9acf"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={setCustomAmount}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleCustomAdd}
              >
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* custom logs */}
          <View style={styles.logsContainer}>
            <View style={styles.logsHeader}>
              <Text style={styles.logsTitle}>Today's Log</Text>

              <Text style={styles.seeAll}>See All</Text>
            </View>

            <FlatList
              data={logs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CustomLogs item={item} />}
              scrollEnabled={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1628",
  },
  headingContainer: {
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  dateText: {
    color: "#6b9acf",
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
  },
  hydrationText: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    color: "#fff",
    marginTop: Spacing.xs,
  },
  streaksSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -Spacing.xxl,
  },
  textSection: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  customInputContainer: {
    width: wp(92),
    maxWidth: 620,
    backgroundColor: "#122040",
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: "#23406E",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Spacing.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    ...Shadow.card,
  },
  dropIcon: {
    fontSize: rf(26),
    marginRight: Spacing.md,
    lineHeight: rf(30),
  },
  txtInput: {
    flex: 1,
    fontSize: FontSize.lg,
    fontFamily: FontFamily.medium,
    color: "#fff",
    paddingVertical: 0,
  },
  addButton: {
    width: wp(14),
    height: wp(14),
    borderRadius: Radius.full,
    backgroundColor: "#18C9FF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Spacing.sm,
  },
  plus: {
    fontSize: rf(32),
    color: "#0A1628",
    lineHeight: rf(34),
  },
  logsContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  logsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  logsTitle: {
    color: "#fff",
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
  },
  seeAll: {
    color: "#18C9FF",
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semiBold,
  },
});
