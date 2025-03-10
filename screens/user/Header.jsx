import React, { useState, useRef } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  SafeAreaView,
  Clipboard,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { WalletContext } from "../../walletContext/WalletContext";
import { useContext, useEffect } from "react";
const { width, height } = Dimensions.get("window");
const MENU_WIDTH = (2 / 3) * width; // 2/3 of the screen width

export default function Header() {
  const { walletAddress, balance } = useContext(WalletContext);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home"); // Track active menu item
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

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
  const shortenAddress = (walletAddress) => {
    return walletAddress
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : "";
  };

  const copyToClipboard = (walletAddress) => {
    Clipboard.setString(walletAddress);
    Alert.alert("Copied!", "Wallet address copied to clipboard.");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={toggleSideMenu} style={styles.menuButton}>
            <Icon name="menu" size={30} color="#333" />
          </TouchableOpacity>
          <Text style={styles.logo}>Welcome </Text>
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

        <Animated.View
          style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
        >
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

              <Text
                style={styles.address}
                onPress={() => copyToClipboard(walletAddress)}
              >
                {" "}
                {shortenAddress(walletAddress)}
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {["Home", "Profile", "Notifications", "Settings", "Support"].map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedMenuItem(item)}
                  style={[
                    styles.menuItem,
                    selectedMenuItem === item && styles.activeMenuItem, // Apply active style
                  ]}
                >
                  <Text
                    style={[
                      styles.menuText,
                      selectedMenuItem === item && styles.activeMenuText, // Change text color for active item
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
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
    fontFamily: "Poppins-SemiBold",
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
    backgroundColor: "#007AFF", // Highlight background when active
  },
  activeMenuText: {
    color: "#fff", // Change text color when active
  },
});
