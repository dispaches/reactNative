import "@walletconnect/react-native-compat";
import { WagmiProvider, useAccount, useWriteContract } from "wagmi";
import {
  mainnet,
  sepolia,
  arbitrum,
  base,
  scroll,
  polygon,
} from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  defaultWagmiConfig,
  createAppKit,
} from "@reown/appkit-wagmi-react-native";


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
import InstantDelivery from "./screens/user/InstantDelivery";
import ScheduleDelivery from "./screens/user/ScheduleDelivery";
import DeliveryDetails from "./screens/user/DeliveryDetails";
import { useFonts } from "expo-font";
import { WalletProvider } from './walletContext/WalletContext';

export const LoginContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole ] = useState(null);
  
  
  // const originalConsoleError = console.error;
  // console.error = (...args) => {
  //   if (typeof args[0] === "string" && args[0].includes("Couldn't establish socket connection")) {
  //     return; // Ignore WalletConnect errors
  //   }
  //   originalConsoleError(...args); // Keep other errors
  // };
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }
// Query client
const queryClient = new QueryClient();
const projectId = "a1ac3f9aafd617a3705c88053470876e";

// Blockchain metadata
const metadata = {
  name: "Dispatches",
  description: "Decentralized Logistics Platform",
  url: "https://dispatches.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

// Blockchain setup
const chains = [mainnet, sepolia, arbitrum, base, scroll, polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Initialize AppKit
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
  features: {
    analytics: true,
    email: true,
    socials: ["Google", "X", "github", "discord", "farcaster"],
    emailShowWallets: true,
  },
  themeMode: "light",
});


  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
    <LoginProvider value={{ userRole, setUserRole }}>
      <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash1">
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
            <Stack.Screen name="InstantDelivery" component={InstantDelivery} options={{ headerShown: false }} />
                <Stack.Screen name="ScheduleDelivery" component={ScheduleDelivery} options={{ headerShown: false }} />
                <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      </WalletProvider>
        </LoginProvider>
        </QueryClientProvider>
        </WagmiProvider>
  );
}
