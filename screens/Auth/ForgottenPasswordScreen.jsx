import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/MaterialIcons";
  
  export default function ForgottenPasswordScreen() {
    const [text, setText] = useState({
      emailAddress: "",
      phoneNumber: "",
    });
  
    const handleChange = (field, value) => {
      setText((prevState) => ({ ...prevState, [field]: value }));
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.action}>Forgotten Password</Text>
          <Text style={styles.subHeading}>
            Enter your registered email or phone number to proceed.
          </Text>
        </View>
  
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={text.emailAddress}
              onChangeText={(text) => handleChange("emailAddress", text)}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Icon name="phone" size={24} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={text.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
            />
          </View>
  
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.backButton} activeOpacity={0.6}>
            <Icon name="arrow-back" size={24} color="#0074D9" />
            <Text style={styles.backText}>Back to the login page</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      paddingHorizontal: 24,
    },
    heading: {
      marginTop: 69,
      alignItems: "flex-start",
    },
    action: {
      color: "#333",
      fontSize: 24,
      fontWeight: "600",
    },
    subHeading: {
      color: "#666",
      fontSize: 16,
      marginTop: 5,
    },
    formContainer: {
      marginTop: 30,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#eeeeee",
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 48,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#CCCCCC",
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      paddingVertical: 10,
    },
    button: {
      backgroundColor: "#FF851B",
      borderRadius: 10,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      justifyContent: "center",
    },
    backText: {
      color: "#0074D9",
      fontSize: 16,
      marginLeft: 5,
    },
  });