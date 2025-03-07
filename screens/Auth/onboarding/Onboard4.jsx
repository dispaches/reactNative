import "@walletconnect/react-native-compat";
import { WagmiProvider, useAccount } from "wagmi";
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
} from "react-native";
import trackImage from "../../../assets/login.png";
import background from "../../../assets/rectangle4.png";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../authContext/LoginContext";

// Query client for React Query
const queryClient = new QueryClient();
const projectId = "a1ac3f9aafd617a3705c88053470876e";

// Metadata for AppKit
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

// Blockchain chains setup
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

// Suppress WalletConnect error messages
// const originalConsoleError = console.error;
// console.error = (...args) => {
//   if (
//     typeof args[0] === "string" &&
//     args[0].includes("Couldn't establish socket connection")
//   ) {
//     return; // Ignore WalletConnect errors
//   }
//   originalConsoleError(...args); // Keep other errors
// };

// Main Onboarding Component
export default function Onboard4() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Onboard4Screen />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Onboarding Screen Component
function Onboard4Screen() {
  const { userRole } = useContext(LoginContext);

  useEffect(() => {
    console.log("User Role in Onboard4:", userRole); // Log the role in Onboard4
  }, [userRole]);

  const { isConnected, error } = useAccount(); // Get wallet connection status
  const navigation = useNavigation();
  const [redirecting, setRedirecting] = useState(false);
  const [customError, setCustomError] = useState("");

  wagmiConfig.connectors.forEach((connector) => {
    if (connector.provider) {
      connector.provider.on("error", (err) => {
        console.log("Suppressing WalletConnect Error:", err); // Prevents it from showing in logs
        setCustomError("Wallet connection failed. Try again.");
        setTimeout(() => {
          setCustomError("");
        }, 3000); // Clear error message after 3 seconds
      });
    }
  });

  useEffect(() => {
    if (!isConnected) {
      setCustomError(
        "Connection failed. Please check your internet and retry."
      );
      Alert.alert(
        "Wallet Connection Error",
        "Couldn't connect to WalletConnect relay server. Try again later."
      );
      setTimeout(() => {
        setCustomError("");
      }, 3000); // Clear error message after 3 seconds
    }
  }, [isConnected]);

  useEffect(() => {
    console.log("User Role in Onboard4:", userRole);
  }, [userRole]);

  useEffect(() => {
    if (isConnected && !redirecting) {
      setRedirecting(true); // Prevent multiple redirects
      console.log("Wallet Connected! Redirecting...");

      setTimeout(() => {
        if (userRole === "rider") {
          navigation.navigate("RiderDashboard");
        } else if (userRole === "user") {
          navigation.navigate("UserDashboard");
        }
      }, 500); // Small delay for smoother transition
    }
  }, [isConnected, userRole, navigation, redirecting]);
  const { open } = useAppKit()

  return (
    <SafeAreaView style={styles.container}>
      {customError ? <Text style={styles.errorText}>{customError}</Text> : null}

      <ImageBackground source={background} style={styles.containerImage}>
        <Image source={trackImage} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Choose your login method</Text>
        <Text style={styles.subtitle}>
          By connecting your wallet you agree to our{" "}
          <Text style={{ color: "#0074D9", fontFamily: "Poppins-SemiBold", }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#0074D9", fontFamily: "Poppins-SemiBold", }}>Privacy Policy</Text>
        </Text>
        <View style={{ alignItems: "center", padding: 10, margin: 10, }}>
          <AppKit />
          <AppKitButton />
        </View>
        <View style={styles.navigation}>
        <Text style={{fontFamily: "Poppins-Regular",}}>
          Already have an account?{" "}
          <Text
            style={styles.span}
            onPress={() => navigation.navigate("login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
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
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 24,
  },
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffe6e6",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontFamily: "Poppins-Regular",
  },
  connectButton: {
    backgroundColor: "#0074D9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  navigation: {
    marginTop: 24,
    alignItems: "center",
  },
  span: {
    color: "#0074D9",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
