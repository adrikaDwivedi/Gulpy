import { StyleSheet, Text, View } from 'react-native'
import 'react-native-reanimated'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomePage from '../screens/HomePage'
import SplashScreen from '../screens/SplashScreen'
import FirstUser from '../screens/FirstUser'

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
        </Stack.Navigator>
     </NavigationContainer>
      )
}

export default AppNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
