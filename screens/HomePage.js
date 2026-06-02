import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React , { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalCard from "../components//GoalCard";
import QuickAddSection from "../components//QuickAddSection";
import CustomLogs from "../components/CustomLogs";




const HomePage = () => {
    const [logs , setLogs] = useState([]);

      const DAILY_GOAL = 2500;
    const [waterConsumed , setWaterConsumed] = useState(1850);
    const [customAmount , setCustomAmount] = useState('');

    const progress = 
    Math.min(
      (waterConsumed / DAILY_GOAL) * 100,
      100
    );

    const remaining = 
    Math.max(
      DAILY_GOAL - waterConsumed,
      0
    );

   const addWater = amount => {
  setWaterConsumed(prev =>
    Math.min(prev + amount, DAILY_GOAL)
  );

  const newLog = {
    id: Date.now().toString(),
    amount,
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    type: 'Water',
  };

  setLogs(prev => [newLog, ...prev]);
};

    const handleCustomAdd = () =>{
      const amount = Number(customAmount);

      if(!amount || amount <= 0){
        return;
      }
      addWater(amount);
      setCustomAmount('');
    }
  const newDate = new Date();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View style={styles.headingContainer}>
        <Text style={styles.dateText}>{newDate.toString().slice(0, 16)}</Text>
        <Text style={styles.hydrationText}>Today's Hydration</Text>
      </View>
      <View style={styles.contentContainer}>
        <GoalCard 
        progress={progress}
        currentWater={waterConsumed}
        remaining={remaining}
        />
        <QuickAddSection
        onAddWater={addWater}
        />

        {/* custom-input-section */}

        <View>
          <View style={styles.customInputContainer}>
            <Text style={styles.dropIcon}>💧</Text>

            <TextInput
              style={styles.txtInput}
              placeholder="Custom amount (ml)..."
              placeholderTextColor="#6b9acf"
              keyboardType="numeric"
              value = {customAmount}
              onChangeText={setCustomAmount}
            />

            <TouchableOpacity style={styles.addButton} 
            onPress={handleCustomAdd}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

      {/* custom logs */}
      <View style={styles.logsContainer}>
  <View style={styles.logsHeader}>
    <Text style={styles.logsTitle}>
      Today's Log
    </Text>

    <Text style={styles.seeAll}>
      See All
    </Text>
  </View>

  <FlatList
    data={logs}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <CustomLogs item={item} />
    )}
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
    marginTop: 20,
    marginLeft: 20,
  },
  dateText: {
    color: "#6b9acf",
    fontSize: 18,
    fontFamily: "DMSans-Medium",
  },
  hydrationText: {
    fontSize: 30,
    fontFamily: "Sora-ExtraBold",
    color: "#fff",
  },
  customInputContainer: {
    width: 400,
    height: 80,
    backgroundColor: "#122040",
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: "#23406E",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dropIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  txtInput: {
    flex: 1,
    fontSize: 20,
    fontFamily: "DMSans-Medium",
    color: "#fff",
  },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#18C9FF",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 34,
    color: "#0A1628",
    marginTop: -2,
  },
  logsContainer: {
  marginTop: 25,
  paddingHorizontal: 20,
},

logsHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},

logsTitle: {
  color: '#fff',
  fontSize: 24,
  fontFamily: 'Sora-ExtraBold',
},

seeAll: {
  color: '#18C9FF',
  fontSize: 15,
},
});
