import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "./Header";
import { WalletContext } from "../../walletContext/WalletContext";
import speed from "../../assets/dashboard/speed.png";
import bgspeed from "../../assets/dashboard/bgspeed.png";
import timer from "../../assets/dashboard/timer.png";
import bgtimer from "../../assets/dashboard/bgtimer.png";
import bike from "../../assets/dashboard/bike.png";
import { useNavigation } from "@react-navigation/native";
export default function UserDashboard() {
   const navigation = useNavigation();
  const { walletAddress, balance } = useContext(WalletContext);
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.balanceContainer}>
          <Text style={styles.label}>Account Balance</Text>
          <View style={styles.balanceWrapper}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.balance}>
              {showBalance ? balance : "••••••"}
            </Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Icon
                name={showBalance ? "visibility" : "visibility-off"}
                size={24}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.delivery}>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: "#666" }}>
            What would you like to do?
          </Text>
          <Pressable style={styles.instantDelivery}  onPress={() => navigation.navigate("InstantDelivery")}>
            <ImageBackground source={bgspeed} style={styles.bgImage} />
            <Image source={speed} />
            <View>
              <Text style={{ fontFamily: "Poppins-SemiBold", color: "#333" }}>
                Instant Delivery
              </Text>
              <Text style={{ fontFamily: "Poppins-Regular", color: "#666" }}>
                Courier takes only your package and delivers instantly
              </Text>
            </View>
          </Pressable>
          <Pressable style={styles.scheduleDelivery} onPress={() => navigation.navigate("ScheduleDelivery")}>
            <ImageBackground source={bgtimer} style={styles.bgImage} />
            <Image source={timer} />
            <View>
              <Text style={{ fontFamily: "Poppins-SemiBold", color: "#333" }}>
                Schedule Delivery
              </Text>
              <Text style={{ fontFamily: "Poppins-Regular", color: "#666" }}>
                Courier comes to pick up on your specified date and time
              </Text>
            </View>
          </Pressable>
          <View style={styles.historyContainer}>
            <View style={styles.header}>
              <Text style={styles.historyText}>History</Text>
              <Text style={styles.seeAllText}>See all</Text>
            </View>

            <View style={styles.history}>
              <View style={styles.order}>
                <View style={styles.info}>
                  <Text style={styles.orderId}>ORDB1234</Text>
                  <Text style={styles.recipient}>Recipient: Paul Pogba</Text>
                </View>
                <Text style={styles.status}>Completed</Text>
              </View>

              <View style={styles.locationContainer}>
                <Image source={bike} style={styles.bikeImage} />
                <View style={styles.locationInfo}>
                  <View style={styles.locationHeader}>
                    <Icon
                      name="location-on"
                      size={24}
                      style={styles.locationIcon}
                    />
                    <Text style={styles.dropOffText}>Drop off</Text>
                  </View>
                  <Text style={styles.locationText}>
                    Maryland Bustop, Anthony Ikeja
                  </Text>
                  <Text style={styles.dateText}>12 January 2020, 2:43pm</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.historyContainer}>
           

            <View style={styles.history}>
              <View style={styles.order}>
                <View style={styles.info}>
                  <Text style={styles.orderId}>ORDB1234</Text>
                  <Text style={styles.recipient}>Recipient: Paul Pogba</Text>
                </View>
                <Text style={styles.status}>Completed</Text>
              </View>

              <View style={styles.locationContainer}>
                <Image source={bike} style={styles.bikeImage} />
                <View style={styles.locationInfo}>
                  <View style={styles.locationHeader}>
                    <Icon
                      name="location-on"
                      size={24}
                      style={styles.locationIcon}
                    />
                    <Text style={styles.dropOffText}>Drop off</Text>
                  </View>
                  <Text style={styles.locationText}>
                    Maryland Bustop, Anthony Ikeja
                  </Text>
                  <Text style={styles.dateText}>12 January 2020, 2:43pm</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    overflow: "hidden",
  },
  scrollContent: {
    padding: 20,
  },
  balanceContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#003366",
    padding: 12,
    borderRadius: 10,
    height: 120,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#f2f2f2",
  },
  balanceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  balance: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    color: "#f2f2f2",
    padding: 8,
  },
  symbol: {
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: 18,
    color: "#f2f2f2",
    fontWeight: "bold",
  },
  eyeIcon: {
    marginLeft: 8,
    color: "#f2f2f2",
  },

  instantDelivery: {
    backgroundColor: "#E3E8FF",
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 12,
    marginTop: 12,
  },

  scheduleDelivery: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 12,
    marginTop: 12,
  },
  bgImage: {
    resizeMode: "cover",
    flex: 1,
    width: 126,
    height: 110,
    left: 200,
  },
  delivery: {
    marginTop: 12,
  },
  historyContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  historyText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  seeAllText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#0074D9",
  },
  history: {
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 16,
  },
  order: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  info: {
    flex: 1,
  },
  orderId: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#0074D9",
    fontWeight: "600",
  },
  recipient: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#666666",
    fontWeight: "600",
  },
  status: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#f2f2f2", 
    backgroundColor: "#27794D",
    alignSelf: "flex-end",
    fontWeight: "500",
    borderRadius: 3,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 6,
    paddingLeft: 6,
    gap: 10,
    alignContent: "center",

  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  bikeImage: {
    width: 24,
    height: 24,
    borderRadius: 25,
    marginRight: 16,
    resizeMode: "contain",
    top: 24,
  },
  locationInfo: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationIcon: {
    color: "#0074D9",
    marginRight: 4,
  },
  dropOffText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  locationText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#0074D9",
    marginBottom: 4,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999999",
  },
});
