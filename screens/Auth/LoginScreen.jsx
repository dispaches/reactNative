import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/MaterialIcons";
  import googleImage from "../../assets/google.png";
  import appleImage from "../../assets/apple.png";
  
  export default function LoginScreen() {
    const [text, setText] = useState({
      emailAddress: "",
      password: "",
    });
  
    const [showPassword, setShowPassword] = useState(false);
  
    const handleChange = (field, value) => {
      setText((prevState) => ({ ...prevState, [field]: value }));
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.action}>Welcome</Text>
          <Text style={styles.subHeading}>
            Sign in to send, track, and receive deliveries effortlessly.
          </Text>
        </View>
  
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("emailAddress", text)}
            value={text.emailAddress}
            placeholder="Email Address"
            keyboardType="email-address"
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={(text) => handleChange("password", text)}
              value={text.password}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#666"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.socialLogin}>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>
  
          <View style={styles.inputContainers}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={appleImage} style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={googleImage} style={styles.icons} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.navigation}>
            <Text>
              Don't have an account? <Text style={styles.span}>Sign up</Text>
            </Text>
          </View>
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
    input: {
      backgroundColor: "#eeeeee",
      borderRadius: 10,
      padding: 12,
      height: 48,
      marginBottom: 12,
    },
    passwordInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#eeeeee",
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 48,
    },
    passwordInput: {
      flex: 1,
    },
    eyeIcon: {
      marginLeft: 8,
    },
    forgotPassword: {
      color: "#0074D9",
      textAlign: "right",
      marginVertical: 10,
    },
    button: {
      backgroundColor: "#FF851B",
      borderRadius: 10,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#f2f2f2",
      fontSize: 16,
    },
    socialLogin: {
      alignItems: "center",
      marginTop: 20,
    },
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "#CCC",
    },
    orText: {
      marginHorizontal: 10,
      fontSize: 16,
      color: "#666",
    },
    inputContainers: {
      flexDirection: "row",
      gap: 12,
    },
    socialButton: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#CCC",
      height: 48,
      width: "48%",
      justifyContent: "center",
      alignItems: "center",
    },
    icons: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
    navigation: {
      marginTop: 24,
      alignItems: "center",
      fontSize: 16,
    },
    span: {
      textDecorationLine: "underline",
      fontWeight: "bold",
      color: "#0074D9",
    },
  });
  