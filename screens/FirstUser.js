import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PresetCard from "../components/PresetCard";
import Reminder from "../components/Reminder";
import ButtonComponent from "../components/ButtonComponent";

const FirstUser = ({ navigation }) => {
  const newDate = new Date();
  const hours = newDate.getHours();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <Text style={styles.headerText}>Set your daily goal</Text>
        </View>

        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitleText}>
            Drag the dial to pick the preset. You can always change this later.
          </Text>
        </View>

        <PresetCard />

        <Reminder />

        <View style={styles.buttonWrapper}>
          <ButtonComponent
            label="Lets start hydrating"
            animated={false}
            textStyle={{ fontFamily: "SpaceGrotesk-Regular" }}
            onPress={() => navigation.navigate('HomePage')}
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
    fontSize: 32,
    fontFamily: "SpaceGrotesk-Regular",
    flex: 1,
    flexWrap: "wrap",
  },
  subtitleWrapper: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  subtitleText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "DMSans-Regular",
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
  buttonWrapper: {
    alignItems: "center",
    marginHorizontal: 25,
    // marginTop: -20,
  },
});
