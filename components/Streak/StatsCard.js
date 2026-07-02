import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { FontSize, FontFamily } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

import { getStats } from "../../utils/statsUtils"; // <-- check filename

const StatsCards = ({waterLogs = {}}) => {

  const stats = getStats(waterLogs);


  // const loadStats = async () => {
  //   const waterLogs = await getItem(KEYS.WATER_LOGS);

  //   const calculatedStats = getStats(waterLogs || {});

  //   setStats(calculatedStats);
  // };
              
  const statsData = [
    {
      value: stats.daysHit,
      label: "Days Hit",
    },
    {
      value: stats.missed,
      label: "Missed",
    },
    {
      value: `${stats.successRate}%`,
      label: "Success Rate",
    },
  ];

  return (
    <View style={styles.container}>
      {statsData.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#123B78", "#0A2A57"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

export default StatsCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  card: {
    flex: 1,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C4E81",
  },
  value: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
  },
  label: {
    marginTop: Spacing.xs,
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
    color: "#82A8D8",
    textAlign: "center",
  },
});