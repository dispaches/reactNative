import "@walletconnect/react-native-compat";
import {
  WagmiProvider,
  useAccount,
  useBalance,
  useWriteContract,
  useContractRead,
} from "wagmi";
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
import { WalletContext } from "../../../walletContext/WalletContext";
import { contractConfig } from "../../../contract/contractConfig";

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

// ✅ Main Component
export default function Onboard4() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Onboard4Screen />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// ✅ Onboarding Screen Component
function Onboard4Screen() {
  const navigation = useNavigation();
  const { isConnected, address } = useAccount();
  const { userRole } = useContext(LoginContext); // ✅ Get user role from context
  const { setWalletAddress, setBalance } = useContext(WalletContext);
  const { open } = useAppKit();
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  // ✅ Fetch Wallet Balance
  const { data: balanceData } = useBalance({ address });

  // ✅ Function to Register User Role
  const { writeContract } = useWriteContract();

  async function storeUserRole(role) {
    if (!isConnected || !role) {
      Alert.alert("Wallet Not Connected", "Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      console.log("🔵 Storing Role:", role);

      await writeContract({
        ...contractConfig,
        functionName: "registerUser",
        args: [role],
      });

      console.log("✅ Role stored successfully on blockchain:", role);

      // ✅ Redirect User Based on Role
      setTimeout(() => {
        navigation.replace(role === 1 ? "RiderDashboard" : "UserDashboard");
      }, 1000);
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      setCustomError("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Store Role Automatically After Wallet Connection
  useEffect(() => {
    if (isConnected && userRole) {
      storeUserRole(userRole);
    }
  }, [isConnected, userRole]);

  // ✅ Handle Wallet Connection Errors
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

  // ✅ Update Wallet Context
  useEffect(() => {
    if (isConnected && address && balanceData) {
      setWalletAddress(address);
      setBalance(balanceData.formatted || "0");
    }
  }, [isConnected, address, balanceData]);

  return (
    <SafeAreaView style={styles.container}>
      {customError && <Text style={styles.errorText}>{customError}</Text>}

      <ImageBackground source={background} style={styles.containerImage}>
        <Image source={trackImage} style={styles.image} />
      </ImageBackground>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Connect Your Wallet</Text>
        <Text style={styles.subtitle}>
          By connecting your wallet you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* ✅ Wallet Connection Section */}
      <View style={styles.walletContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0074D9" />
        ) : (
          <>
            <AppKit />
            <AppKitButton onPress={open} />
          </>
        )}
      </View>

      {/* ✅ Navigation Links */}
      <View style={styles.navigation}>
        <Text style={styles.subtitle}>
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ✅ Styles
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
