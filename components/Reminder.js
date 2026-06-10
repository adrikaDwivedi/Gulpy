import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Reminder = () => {
  const reminderTimes = [
    "7:00 AM",
    "10:00 AM",
    "1:00 PM",
    "4:00 PM",
    "7:00 PM",
    "9:00 PM",
  ];

  const [selectedTimes, setSelectedTimes] = useState([
    "7:00 AM",
    "10:00 AM",
    "4:00 PM",
    "9:00 PM",
  ]);

  const toggleReminder = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const [remindersEnabled, setRemindersEnabled] = useState(false);
  return (
    <View>
      <View style={styles.reminderSection}>
        <View style={styles.reminderHeader}>
          <View>
            <Text style={styles.reminderTitle}>Drink reminders</Text>

            <Text style={styles.reminderSubtitle}>
              Tap to toggle for reminders to on or off
            </Text>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            trackColor={{
              false: "#1A3157",
              true: "#2E90FA",
            }}
            style={{
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              marginRight: 20,
            }}
          />
        </View>

        <View style={styles.endSection}>
          <View style={styles.chipsContainer}>
            {reminderTimes.map((time) => {
              const active = selectedTimes.includes(time);

              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => toggleReminder(time)}
                  style={[styles.chip, active && styles.activeChip]}
                >
                  <Text
                    style={[styles.chipText, active && styles.activeChipText]}
                  >
                    {active ? "🔔 " : ""}
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    marginLeft: 25,
  },
  reminderTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "SpaceGrotesk-Regular",
  },

  reminderSubtitle: {
    color: "#7EA6D9",
    marginTop: 8,
    fontSize: 15,
    maxWidth: "85%",
    fontFamily: "DMSans-Regular",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "flex-start",
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
  },

  chip: {
    flexBasis: "30%",
    paddingHorizontal: 8,
    height: 40,
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: "#102A52",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#183E72",
    overflow: "hidden",
  },

  activeChip: {
    borderColor: "#1DA1F2",
    backgroundColor: "#113A6C",
  },

  chipText: {
    color: "#6F94C4",
    fontWeight: "600",
    fontSize: 12,
    fontFamily: "DMSans-Regular",
  },
  activeChipText: {
    color: "#9FD3FF",
  },
});
