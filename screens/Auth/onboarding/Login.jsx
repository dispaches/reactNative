import "@walletconnect/react-native-compat";
import { WagmiProvider, useAccount, useContractRead } from "wagmi";
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
  AppKit,
} from "@reown/appkit-wagmi-react-native";
import { AppKitButton, useAppKit } from "@reown/appkit-wagmi-react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import trackImage from "../../../assets/login.png";
import background from "../../../assets/rectangle4.png";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../authContext/LoginContext";
import { contractConfig } from "../../../contract/contractConfig";

// Query client for React Query
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


export default function Login() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LoginScreen />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function LoginScreen() {
  const navigation = useNavigation();
  const { setUserRole } = useContext(LoginContext);
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  // **Fetch User Role from Blockchain**
  const { data: userRole, isLoading: isFetchingRole } = useContractRead({
    ...contractConfig,
    functionName: "getUser",
    args: [address],
  });

  // **Handle Wallet Connection Errors**
  useEffect(() => {
    if (!isConnected) {
      setCustomError(
        "Connection failed. Please check your internet and retry."
      );
      Alert.alert(
        "Wallet Connection Error",
        "Couldn't connect to WalletConnect relay server. Try again later."
      );
      setTimeout(() => setCustomError(""), 3000);
    }
  }, [isConnected]);

  // **Redirect User Based on Role**
  useEffect(() => {
    if (isConnected && userRole !== undefined) {
      setIsLoading(true);
      setUserRole(userRole);
      console.log("✅ Fetched User Role:", userRole);

      setTimeout(() => {
        setIsLoading(false);
        if (userRole === 1) {
          navigation.replace("RiderDashboard");
        } else {
          navigation.replace("UserDashboard");
        }
      }, 1000);
    }
  }, [isConnected, userRole, navigation, setUserRole]);

  return (
    <SafeAreaView style={styles.container}>
      {customError ? <Text style={styles.errorText}>{customError}</Text> : null}

      <ImageBackground source={background} style={styles.containerImage}>
        <Image source={trackImage} style={styles.image} />
      </ImageBackground>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Sign In to Your Account</Text>
        <Text style={styles.subtitle}>
          By connecting your wallet you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>

      {/* **Wallet Connection Section** */}
      <View style={styles.walletContainer}>
        {isLoading || isFetchingRole ? (
          <ActivityIndicator size="large" color="#0074D9" />
        ) : (
          <>
            <AppKit />
            <AppKitButton
              label="Sign In with Wallet"
              size="md"
              onPress={open}
            />
          </>
        )}
      </View>

      <View style={styles.navigation}>
        <Text style={styles.subtitle}>
          Don't have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("GettingStarted")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

// **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-evenly",
  },
  containerImage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    right: 14,
  },
  image: {
    resizeMode: "contain",
    alignContent: "center",
    justifyContent: "center",
  },
  textContainer: { alignItems: "center", marginVertical: 20, padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Poppins-Regular",
  },
  linkText: {
    color: "#0074D9",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffe6e6",
    borderRadius: 5,
  },
  walletContainer: { alignItems: "center", padding: 10, margin: 10 },
  navigation: { marginTop: 24, alignItems: "center" },
});
