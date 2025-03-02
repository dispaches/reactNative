import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
    Pressable,
  } from "react-native";
  import trackImage from "../../../assets/login.png";
  import background from "../../../assets/rectangle4.png";
  import { useNavigation } from "@react-navigation/native";
  import { roleData } from "../../../data";
  
  export default function Onboard4() {
    const navigation = useNavigation();
  
    function handleClick(role) {
      if (role === "Rider") {
        console.log("rider is picked");
        navigation.navigate("RiderDashboard");
      } else if (role === "User") {
        console.log("user is picked");
        navigation.navigate("UserDashboard");
      }
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.containerImage}>
          <Image source={trackImage} style={styles.image} />
        </ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Choose your login method</Text>
          <Text style={styles.subtitle}>
            By connecting your wallet you agree to our{" "}
            <Text style={{ color: "#0074D9" }}>Terms of Service</Text> and{" "}
            <Text style={{ color: "#0074D9" }}>Privacy Policy</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {roleData?.map((role, index) => (
            <Pressable
              key={index}
              style={index === 0 ? styles.rider : styles.user}
              onPress={() => {
                console.log("Button clicked!");
                handleClick(role.role_cap);
              }}
            >
              <Text style={index === 0 ? styles.roleRider : styles.roleUser}>
                {role.role_cap}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      justifyContent: "space-evenly",
    },
    containerImage: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      top: 24,
      resizeMode: "contain",
      padding: 24,
      alignContent: "center",
      justifyContent: "center",
    },
    textContainer: {
      alignItems: "center",
      marginVertical: 20,
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginTop: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 20,
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
    roleRider: {
      color: "#FF851B",
      fontSize: 14,
      fontWeight: "600",
    },
    roleUser: {
      color: "#0074D9",
      fontSize: 14,
      fontWeight: "600",
    },
  });