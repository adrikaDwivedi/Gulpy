import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "../screens/HomePage";
import SplashScreen from "../screens/SplashScreen";
import FirstUser from "../screens/FirstUser";
import Streaks from "../screens/Streaks";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="FirstUser" component={FirstUser} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Streaks" component={Streaks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1628",
  },
});
