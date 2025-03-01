import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Splash2({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("GettingStarted");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/dispatch1.png")} style={styles.image} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingTop: 240,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
