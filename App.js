import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./navigation//AppNavigator";
import {useFonts} from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const [fontsLoaded] = useFonts({
  'Sora-Regular': require('./assets/fonts/Sora-Regular.ttf'),
  'Sora-SemiBold': require('./assets/fonts/Sora-SemiBold.ttf'),
  'Sora-Bold': require('./assets/fonts/Sora-Bold.ttf'),
  'Sora-ExtraBold': require('./assets/fonts/Sora-ExtraBold.ttf'),

  'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
  'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
  'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
});

if (!fontsLoaded) {
  return null;
}


  return (
    <SafeAreaProvider>
    <AppNavigator/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
