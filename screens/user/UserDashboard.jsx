import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function UserDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = new Animated.Value(-250); // Start position off-screen

  const toggleSideMenu = () => {
    setShowMenu(!showMenu);
    Animated.timing(slideAnim, {
      toValue: showMenu ? -250 : 0, // Show or hide the menu
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={toggleSideMenu}>
          <Icon name={showMenu ? "close" : "menu"} size={30} color="#666666" />
        </TouchableOpacity>
          </View>
            <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.menuText}>Home</Text>
        <Text style={styles.menuText}>Profile</Text>
        <Text style={styles.menuText}>Orders</Text>
        <Text style={styles.menuText}>Settings</Text>
        <Text style={styles.menuText}>Logout</Text>
        </Animated.View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  navigation: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#666",
    paddingTop: 60,
    paddingLeft: 20,
  },
  menuText: {
    color: "#666",
    fontSize: 18,
    marginBottom: 20,
  },
});
