import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/Auth/RegisterScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import ForgottenPasswordScreen from './screens/Auth/ForgottenPasswordScreen';
import GettingStarted from './screens/Auth/onboarding/GettingStarted';
import Splash2 from './splash/Splash2';
import Splash1 from './splash/Splash1';
import Onboard1 from './screens/Auth/onboarding/Onboard1';
import Onboard2 from './screens/Auth/onboarding/Onboard2';
import Onboard3 from './screens/Auth/onboarding/Onboard3';
import Onboard4 from './screens/Auth/onboarding/Onboard4';
import OnboardRider1 from './screens/rider/OnboardRider1';
import OnboardRider2 from './screens/rider/OnboardRider2';
import OnboardRider3 from './screens/rider/OnboardRider3';
import { LoginProvider } from "./authContext/LoginContext";
import Login from "./screens/Auth/onboarding/Login";
import UserDashboard from "./screens/user/UserDashboard";

export const LoginContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole ] = useState(null);
  
  
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Couldn't establish socket connection")) {
      return; // Ignore WalletConnect errors
    }
    originalConsoleError(...args); // Keep other errors
  };
  
  return (
    <LoginProvider value={{ userRole, setUserRole  }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserDashboard">
          <Stack.Screen name="Splash1" component={Splash1} options={{ headerShown: false }} />
          <Stack.Screen name="Splash2" component={Splash2} options={{ headerShown: false }} />
          <Stack.Screen name="GettingStarted" component={GettingStarted} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name="ForgottenPassword" component={ForgottenPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard1" component={Onboard1} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard2" component={Onboard2} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard3" component={Onboard3} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard4" component={Onboard4} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardRider1" component={OnboardRider1} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardRider2" component={OnboardRider2} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardRider3" component={OnboardRider3} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>
  );
}
