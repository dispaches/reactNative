import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import riderImage from "../../../assets/delivery.png";
import background from "../../../assets/rectangle.png";
import { Button } from "react-native-elements";

export default function Onboard1() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.containerImage}>
        <Image source={riderImage} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Swift. Secure. Seamless Deliveries</Text>
        <Text style={styles.subtitle}>
          Move goods faster with real-time tracking, secure payments, and
          trusted drivers.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Skip"
          buttonStyle={styles.buttonSecondary}
          titleStyle={styles.buttonSecondaryText}
        />
        <Button title="Next" buttonStyle={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 24,
    justifyContent: "space-evenly",
  },
  containerImage: {
    flexDirection: "end",
    justifyContent: "center",
    alignItems: "center",
    left: 24,
  },
  image: {
    width: 393,
    height: 361,
    top: 24,
    left: -17,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
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
  buttonSecondary: {
    width: 135,
    height: 48,
    backgroundColor: "#f2f2f2",
    textColor: "#0074D9",
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 12,
  },
  button: {
    width: 135,
    height: 48,
    backgroundColor: "#0074D9",
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 12,
  },
  buttonSecondaryText: {
    color: "#0074D9",
  },
});
