import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import trackImage from "../../../assets/payment.png";
import background from "../../../assets/rectangle3.png";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Onboard3() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.containerImage}>
        <Image source={trackImage} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Track Your Orders in Real-Time.</Text>
        <Text style={styles.subtitle}>
          Watch your deliveries live, confirm arrival, and release payments only
          when satisfied
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Skip"
          buttonStyle={styles.buttonSecondary}
          titleStyle={styles.buttonSecondaryText}
          onPress={() => navigation.navigate("Onboard4")}
        />
        <Button
          title="Next"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Onboard4")}
        />
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
    marginTop: 8,
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
