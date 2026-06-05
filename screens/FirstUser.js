import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const FirstUser = ({ navigation }) => {
  const newDate = new Date();
  const hours = newDate.getHours();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={25} color="#4dc1f7" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Hello Pineapple, it's {hours} {hours < 12 ? "am" : "pm"} Let's start
            hydrating
          </Text>
        </View>
        
        <View>
          <Text style={{marginTop:20, marginLeft:25,
             fontSize: 32, 
             color: "#fff",
             fontFamily: 'SpaceGrotesk-Bold',
             
             }}>Set your daily goal</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstUser;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0a1628",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Sora-Regular",
    flex: 1,
    flexWrap: "wrap",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 14,
  },
});
