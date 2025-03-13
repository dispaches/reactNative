import "@walletconnect/react-native-compat";
import {
  WagmiProvider,
  useAccount,
  useBalance,
  useWriteContract,
  useContractRead,
  useDisconnect,
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

import React, { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from "@react-native-clipboard/clipboard";
import { WalletContext } from "../../walletContext/WalletContext"; // Ensure correct import path


const { width, height } = Dimensions.get("window");
const MENU_WIDTH = (2 / 3) * width; // Side menu width

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
export default function Header() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <HeaderScreen />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

 function HeaderScreen() {
  const { walletAddress, setWalletAddress, setBalance } = useContext(WalletContext);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const { disconnect } = useDisconnect();
  const navigation = useNavigation();
  // ✅ Debugging: Check if walletAddress exists
  useEffect(() => {
    console.log("Wallet Address from Context:", walletAddress);
  }, [walletAddress]);

  const toggleSideMenu = () => {
    if (showMenu) {
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowMenu(false));
    } else {
      setShowMenu(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // ✅ Shorten wallet address for display
  const shortenAddress = (walletAddress) => {
    return walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Not Connected";
  };

  const copyToClipboard = () => {
    if (walletAddress) {
      Clipboard.setString(walletAddress);
      Alert.alert("Copied!", "Wallet address copied to clipboard.");
    } else {
      Alert.alert("No Address", "No wallet address found.");
    }
  };
  const handleDisconnect = () => {
    disconnect(); // Calls Wagmi's disconnect function
    setWalletAddress(null); // Reset wallet state
    setBalance(0);
    Alert.alert("Disconnected", "Your wallet has been disconnected.", [
      { text: "OK", onPress: () => navigation.replace("GettingStarted") }, 
    ]);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={toggleSideMenu} style={styles.menuButton}>
            <Icon name="menu" size={30} color="#333" />
          </TouchableOpacity>
          <Text style={styles.logo}>Welcome</Text>
          <TouchableOpacity>
            <Icon name="notifications" size={30} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Side Menu Overlay */}
        {showMenu && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleSideMenu}
          />
        )}

        {/* Side Menu */}
        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
          {/* Close Button */}
          <TouchableOpacity onPress={toggleSideMenu} style={styles.closeButton}>
            <Icon name="close" size={30} color="#333" />
          </TouchableOpacity>

          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>DE</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Davidson Edgar</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.address}>{shortenAddress(walletAddress)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {["Home", "Profile", "Notifications", "Settings", "Support"].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelectedMenuItem(item)}
                style={[
                  styles.menuItem,
                  selectedMenuItem === item && styles.activeMenuItem,
                ]}
              >
                <Text
                  style={[
                    styles.menuText,
                    selectedMenuItem === item && styles.activeMenuText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleDisconnect} style={styles.disconnectButton}>
            <Text style={styles.disconnectText}>Disconnect Wallet</Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  menuButton: {
    zIndex: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 50,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: height,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    borderRadius: 15,
    padding: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  circleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "underline",
  },
  menuItems: {
    marginTop: 20,
    width: "100%",
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 18,
    color: "#003366",
  },
  activeMenuItem: {
    backgroundColor: "#007AFF",
  },
  activeMenuText: {
    color: "#f2f2f2",
  },
  disconnectButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
  },
  disconnectText: {
    color: "#f2f2f2",
    fontWeight: "bold",
  },
});
