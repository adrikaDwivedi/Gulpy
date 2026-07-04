import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularProgress from "./CircularProgress";

const GoalCard = ({ dailyGoal, progress, waterConsumed, remaining }) => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <CircularProgress
          dailyGoal={dailyGoal}
          progress={progress}
          waterConsumed={waterConsumed}
        />
      </View>

      <View style={styles.right}>
        <Text style={styles.remaining}>Remaining</Text>
        <Text style={styles.remAmount}>
          {remaining}
          <Text style={styles.ml}>ml</Text>
        </Text>

        <Text style={styles.dailyGoal}>Daily Goal</Text>

        {/* 
      <View style={styles.progressbg}>
        <View style={styles.progressFill}/>
      </View> */}

        <Text style={styles.goalFooter}> Goal: {dailyGoal}ml today</Text>
      </View>
    </View>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#102550",
    borderRadius: 50,
    padding: 18,
    flexDirection: "row",
    marginTop: 25,
    width: 420,
    alignSelf: "center",
  },
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1.2,
    justifyContent: "center",
    paddingLeft: 20,
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#152E63",
  },
  percent: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "700",
  },
  current: {
    color: "#8FB8FF",
    fontSize: 24,
    marginTop: 6,
  },
  total: {
    color: "#7090C9",
    fontSize: 16,
    marginTop: 2,
  },

  remaining: {
    color: "#8FB8FF",
    fontSize: 20,
  },
  remAmount: {
    color: "#18C9FF",
    fontSize: 50,
    fontWeight: "700",
    marginTop: 5,
  },
  ml: {
    fontSize: 28,
    color: "#a6bee8",
  },
  dailyGoal: {
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
  },
  //   progressbg: {
  //   height: 12,
  //   borderRadius: 12,
  //   backgroundColor: "#23406E",
  //   overflow: "hidden",
  // },
  //   progressFill: {
  //   width: "74%",
  //   height: "100%",
  //   backgroundColor: "#18C9FF",
  //   borderRadius: 12,
  // },
  goalFooter: {
    marginTop: 0,
    color: "#8FB8FF",
    fontSize: 18,
    marginLeft: -8,
  },
});
