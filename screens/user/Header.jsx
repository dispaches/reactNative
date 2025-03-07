import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
    Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
const MENU_WIDTH = (2 / 3) * width; // Now 2/3 of the screen width

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
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
          {/* Close Button Inside Menu */}
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
              <Text style={styles.address}>0x841a...8a57</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <TouchableOpacity>
              <Text style={styles.menuText}> Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}> Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}> Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}> Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}> Logout</Text>
            </TouchableOpacity>
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
    fontWeight: "24",
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
  },
  menuText: {
    fontSize: 18,
    color: "#007AFF",
    paddingVertical: 10,
  },
});
