import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import RegisterScreen from './screens/Auth/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import ForgottenPasswordScreen from './screens/Auth/ForgottenPasswordScreen';
import GettingStarted from './screens/Auth/onboarding/GettingStarted';
import Splash2 from './splash/Splash2';
import Splash1 from './splash/Splash1';
import Onboard1 from './screens/Auth/onboarding/Onboard1';
import Onboard2 from './screens/Auth/onboarding/Onboard2';
import Onboard3 from './screens/Auth/onboarding/Onboard3';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash1">
        <Stack.Screen name="Splash1" component={Splash1}  options={{ headerShown: false }} />
        <Stack.Screen name="Splash2" component={Splash2}  options={{ headerShown: false }} />
        <Stack.Screen name="GettingStarted" component={GettingStarted}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="ForgottenPassword" component={ForgottenPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboard1" component={Onboard1} options={{ headerShown: false }} />
        <Stack.Screen name="Onboard2" component={Onboard2} options={{ headerShown: false }} />
        <Stack.Screen name="Onboard3" component={Onboard3} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',  
    fontFamily: "Poppins-Regular",
  },
});