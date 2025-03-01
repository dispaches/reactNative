import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import riderImage from "../../../assets/rider.png";
import userImage from "../../../assets/user.png";

export default function GettingStarted() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.action}>Get Started with Dispatches</Text>
        <Text style={styles.subHeading}>
          Choose your role to continue. Are you signing up as a Rider or a User?
        </Text>
      </View>

      <TouchableOpacity style={styles.rider}>
        <Image source={riderImage} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.roleRider}>Sign up as a Rider</Text>
          <Text style={styles.subRole}>
            Earn money by delivering packages while enjoying the flexibility to
            work at your convenience. Stay updated with real-time job
            notifications and take control of your schedule effortlessly.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.user}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.roleUser}>Sign up as a User</Text>
          <Text style={styles.subRole}>
            Send and track your deliveries effortlessly with a fast and reliable
            network of riders. Enjoy a secure payment and tracking system that
            ensures your packages reach their destination safely and on time.
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.navigation}>
        <Text>
          Already had an account? <Text style={styles.span}>Sign in</Text>
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
    lineHeight: 119,
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
    marginTop: 5,
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
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
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
  subRole: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
  },
  navigation: {
    marginTop: 24,
    alignItems: "center",
  },
  span: {
    color: "#0074D9",
    fontWeight: "600",
  },
});