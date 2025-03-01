import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import flagImage from "../../assets/flag.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import googleImage from "../../assets/google.png";
import appleImage from "../../assets/apple.png";
//import { CheckBox } from "react-native-elements";

export default function RegisterScreen() {
  const [text, setText] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (field, value) => {
    setText((prevState) => ({ ...prevState, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.action}>Register</Text>
        <Text style={styles.subHeading}>
          Sign in to send, track, and receive deliveries effortlessly.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("firstName", text)}
            value={text.firstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("lastName", text)}
            value={text.lastName}
            placeholder="Last Name"
          />
        </View>
        <View style={styles.phoneInputContainer}>
          <Image source={flagImage} style={styles.icon} />
          <Icon
            name="arrow-drop-down"
            size={24}
            color="#666666"
            style={styles.dropdownIcon}
          />
          <TextInput
            style={styles.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
            value={text.phoneNumber}
            placeholder="Phone Number"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            onChangeText={(text) => handleChange("emailAddress", text)}
            value={text.emailAddress}
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={(text) => handleChange("password", text)}
            value={text.password}
            placeholder="Password"
            secureTextEntry={!showPassword}
            keyboardType="default"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#666666"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.privacy}>
          <Text style={styles.policy}>
            By signing up, you agree to our{" "}
            <Text style={styles.span}>Terms of Service</Text> and{" "}
            <Text style={styles.span}>Privacy Policies</Text>.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} disabled={!isChecked}>
          <Text style={{ color: "#f2f2f2", fontSize: 16 }}>Register</Text>
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
          <Text>Already had an account? <Text style={styles.span}>Sign in</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#f2f2f2",
  },
  heading: {
    marginTop: 69,
    alignItems: "flex-start",
    letterSpacing: 1,
    lineHeight: 119,
    padding: 24,
  },
  action: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "600",
  },
  subHeading: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "400",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  input: {
    backgroundColor: "#eeeeee",
    borderColor: "#CCCCCC",
    borderRadius: 10,
    color: "#666666",
    paddingLeft: 12,
    height: 48,
    width: "48%",
    borderWidth: 1,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderColor: "#CCCCCC",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
    marginTop: 12,
  },
  phoneNumber: {
    flex: 1,
    color: "#666666",
    height: "100%",
    paddingLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dropdownIcon: {
    marginLeft: "auto",
    marginRight: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderColor: "#CCCCCC",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
    marginTop: 12,
  },
  passwordInput: {
    flex: 1,
    color: "#666666",
    height: "100%",
    paddingLeft: 8,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkboxText: {
    color: "#666666",
  },
  button: {
    backgroundColor: "#FF851B",
    borderRadius: 10,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  policy: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
    flexWrap: "wrap",
  },
  span: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#0074D9",
  },
  privacy: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  socialLogin: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 32,
    gap: 12,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#666",
  },

  inputContainers: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },

  socialButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
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
    justifyContent: "center",
    fontSize: 16,
  },
});
