import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StreakCard = () => {
  return (
    <LinearGradient
      colors={["#082654", "#0A2A57"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="flame-outline"
          size={52}
          color="#FFF"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Current streak</Text>

        <View style={styles.daysRow}>
          <Text style={styles.number}>10</Text>
          <Text style={styles.days}>days</Text>
        </View>


        <Text style={styles.subtitle}>
        <Ionicons 
      name="checkmark-done-outline"
      size={20}
      color="#fff"
      />
          Goal hit every day!
        </Text>
      </View>
    </LinearGradient>
  );
};

export default StreakCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 28,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    marginLeft: 22,
    flex: 1,
  },
  label: {
    color: "#7DA7DF",
    fontSize: 18,
    fontFamily: "Sora-Regular",
    marginBottom: 2,
  },
  daysRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  number: {
    color: "#FFFFFF",
    fontSize: 64,
    fontFamily: "Sora-Bold",
    lineHeight: 68,
  },
  days: {
    color: "#00CFFF",
    fontSize: 28,
    fontFamily: "Sora-Bold",
    marginLeft: 8,
    marginBottom: 10,
  },
  subtitle: {
    color: "#7DA7DF",
    fontSize: 17,
    fontFamily: "Sora-Regular",
    marginTop: 4,
  },
});