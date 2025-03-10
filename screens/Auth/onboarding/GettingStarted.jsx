import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import riderImage from "../../../assets/rider.png";
import userImage from "../../../assets/user.png";
import { roleData } from "../../../data";
import Splash from "../../../splash/Splash1";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../../authContext/LoginContext";
import { Pressable } from "react-native";

export default function GettingStarted() {
  const navigation = useNavigation();
  const { setRole, setUserRole } = useContext(LoginContext);
  const [removeSplash, setRemoveSplash] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setRemoveSplash(true);
    }, 500);
  }, []);

  function handleClick(index) {
  if (index === 0) {
    setUserRole("rider"); // Set role
    console.log("Rider is picked");
    navigation.navigate("OnboardRider1"); // Navigate to wallet connection page
  } else if (index === 1) {
    setUserRole("user"); // Set role
    console.log("User is picked");
    navigation.navigate("Onboard1"); // Navigate to wallet connection page
  }
}


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.action}>Get Started with Dispatches</Text>
        <Text style={styles.subHeading}>
          Choose your role to continue. Are you signing up as a Rider or a User?
        </Text>
      </View>

      {roleData?.map((role, index) => (
        <Pressable
          key={index}
          style={index === 0 ? styles.rider : styles.user}
          onPress={() => {
            console.log("Button clicked!");
            handleClick(index);
          }}
        >
          <Image
            source={index === 0 ? riderImage : userImage}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={index === 0 ? styles.roleRider : styles.roleUser}>
              {role.role_cap}
            </Text>
            <Text style={styles.subRole}>{role.details}</Text>
          </View>
        </Pressable>
      ))}

      <View style={styles.navigation}>
        <Text style={{fontFamily: "Poppins-Regular",}}>
          Already have an account?{" "}
          <Text
            style={styles.span}
            onPress={() => navigation.navigate("Onboard1")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 24,
  },
  heading: {
    marginTop: 69,
    alignItems: "flex-start",
    letterSpacing: 1,
  },
  action: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  subHeading: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 5,
    fontFamily: "Poppins-Regular",
  },
  rider: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#cccccc",
    marginTop: 24,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#cccccc",
    marginTop: 24,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  roleRider: {
    color: "#FF851B",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  roleUser: {
    color: "#0074D9",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  subRole: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    fontFamily: "Poppins-Regular",
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