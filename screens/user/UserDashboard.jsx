import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "./Header";

export default function UserDashboard() {
  
  return (
    <View >
      <Header />
      <View><Text>User Dashboard</Text></View>
      
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
    alignItems: "center",
    justifyContent: "center",
  },
  
});
