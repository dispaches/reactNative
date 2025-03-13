import "@walletconnect/react-native-compat";
import { WagmiProvider, useAccount, useWriteContract } from "wagmi";
import {
  mainnet,
  sepolia,
  arbitrum,
  base,
  scroll,
  polygon,
} from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  defaultWagmiConfig,
  createAppKit,
} from "@reown/appkit-wagmi-react-native";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import DateTimePicker from "expo-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import bike from "../../assets/delivery/bike.png";
import car from "../../assets/delivery/car.png";
import van from "../../assets/delivery/van.png";
import locationIcon from "../../assets/delivery/location.png";
import dropoffIcon from "../../assets/delivery/dropofflocation.png";
import { contractConfig } from "../../contract/contractConfig";
import { WalletContext } from "../../walletContext/WalletContext";
import CryptoJS from "crypto-js/core";
import "crypto-js/sha256";
import "crypto-js/hmac-sha256";
import "crypto-js/enc-base64";
import moment from "moment";
import { Buffer } from "buffer";
import uuid from "react-native-uuid";

const SCREEN_HEIGHT = Dimensions.get("window").height;
// Query client
const queryClient = new QueryClient();
const projectId = "a1ac3f9aafd617a3705c88053470876e";

// Blockchain metadata
const metadata = {
  name: "Dispatches",
  description: "Decentralized Logistics Platform",
  url: "https://dispatches.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

// Blockchain setup
const chains = [mainnet, sepolia, arbitrum, base, scroll, polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Initialize AppKit
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
  features: {
    analytics: true,
    email: true,
    socials: ["Google", "X", "github", "discord", "farcaster"],
    emailShowWallets: true,
  },
  themeMode: "light",
});
export default function ScheduleDelivery() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ScheduleDeliveryScreen />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function ScheduleDeliveryScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destination, setDestination] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { walletAddress } = useContext(WalletContext);
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    console.log("Wallet Address in Schedule Delivery:", walletAddress);
  }, [walletAddress]);

  // Get user's current location & address
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Enable location services to use the map."
        );
        setLoading(false);
        return;
      }

      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (newLocation) => {
          setLocation(newLocation.coords);
          await getAddressFromCoordinates(
            newLocation.coords.latitude,
            newLocation.coords.longitude
          );
          setLoading(false);
        }
      );

      return () => locationWatcher.remove();
    })();
  }, []);

  // Convert coordinates to a human-readable address
  async function getAddressFromCoordinates(lat, lng) {
    try {
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (addressResponse.length > 0) {
        let formattedAddress = `${addressResponse[0].name}, ${addressResponse[0].city}`;
        setPickupAddress(formattedAddress);
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
  }

  async function handleSetDestination(address) {
    setDeliveryLocation(address);
    if (!address) return setDestination(null);

    try {
      const apiKey = "0cec6571e6554f59a287aca515413f70";
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setDestination({
          latitude: lat,
          longitude: lng,
        });
      } else {
        Alert.alert(
          "Invalid Address",
          "Could not find the location. Try another address."
        );
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch location. Check network or API response."
      );
    }
  }

  function handleVehicleSelection(type) {
    setSelectedVehicle(type);
  }
  function calculatePrice(vehicleType) {
    const basePrice = 5; // Base delivery fee
    const vehiclePrices = {
      bike: 10,
      car: 20,
      van: 30,
    };
    return basePrice + (vehiclePrices[vehicleType] || 0);
  }
  function handleDateChange(event, selectedDate) {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); // Close the picker
  }

  // Handle Time Selection
  function handleTimeChange(event, selectedTime) {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShowTimePicker(false); // Close the picker
  }
  const FILEBASE_ACCESS_KEY = "BDD6B8DDA41DEA00FFBA";
  const FILEBASE_SECRET_KEY = "fCaNSVdlFNIO4MPuTsjBcDdSYRT1HQcTGW0qxC5K";
  const FILEBASE_BUCKET_NAME = "dispatches-storage";

  async function uploadToFilebase(data) {
    try {
      const region = "us-east-1";  // Filebase uses AWS S3 (us-east-1)
      const service = "s3";
      const host = `${FILEBASE_BUCKET_NAME}.s3.filebase.com`;
  
      let fileUrl;
      let fileExists = true;
      let attempts = 0;
  
      while (fileExists && attempts < 5) {
        const fileId = uuid.v4();
        const endpoint = `https://${host}/${fileId}.json`; // 📂 File will be stored as "delivery.json"
  
        // Convert JSON data into a Blob
        const payload = JSON.stringify(data);
        const payloadHash = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
  
        // Generate date/time for signature
        const date = moment().utc().format("YYYYMMDD");
        const timestamp = moment().utc().format("YYYYMMDDTHHmmss") + "Z";
        const credentialScope = `${date}/${region}/${service}/aws4_request`;
  
        // Create canonical request
        const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${timestamp}\n`;
        const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
        const canonicalRequest = `PUT\n/${fileId}.json\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  
        // Generate the string to sign
        const stringToSign = `AWS4-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex)}`;
  
        // Generate signing key
        function getSignatureKey(key, dateStamp, regionName, serviceName) {
          const kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key);
          const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
          const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
          const kSigning = CryptoJS.HmacSHA256("aws4_request", kService);
          return kSigning;
        }
        const signingKey = getSignatureKey(FILEBASE_SECRET_KEY, date, region, service);
        const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString(CryptoJS.enc.Hex);
  
        // Construct authorization header
        const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${FILEBASE_ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
        // Send request to Filebase S3 API
        try {
          const response = await axios.put(endpoint, payload, {
            headers: {
              "Content-Type": "application/json",
              "x-amz-content-sha256": payloadHash,
              "x-amz-date": timestamp,
              Authorization: authorizationHeader,
            },
          });
  
          console.log("✅ File uploaded to Filebase:", response.config.url);
          fileUrl = response.config.url; // Return the URL of the uploaded file
          fileExists = false;
        } catch (error) {
          if (error.response && error.response.status === 409) {
            // File already exists, generate a new UUID and try again
            attempts++;
          } else {
            throw error;
          }
        }
      }
  
      if (fileExists) {
        throw new Error("Failed to upload file after multiple attempts.");
      }
  
      return fileUrl;
    } catch (error) {
      console.error("❌ Filebase Upload Failed:", error.response ? error.response.data : error.message);
      Alert.alert("Filebase Upload Failed", "Check your API credentials & internet connection.");
      return null;
    }
  }
  async function handleSubmit() {
    if (!address) {
      return Alert.alert(
        "Wallet Not Connected",
        "Please connect your wallet first."
      );
    }

    if (!pickupAddress || !deliveryLocation || !selectedVehicle || !date || !time) {
      return Alert.alert("Missing Info", "Fill all fields before proceeding.");
    }

    setLoading(true);
    const orderId = uuid.v4();
    const deliveryData = {
      orderId,
      type: "scheduled",
      pickup: pickupAddress,
      dropoff: deliveryLocation,
      vehicle: selectedVehicle,
      walletAddress: address, 
      price: calculatePrice(selectedVehicle),
      date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      time: time.toTimeString().split(' ')[0], // Format time as HH:MM:SS
    };

    // ✅ Upload to Filebase
    const filebaseUrl = await uploadToFilebase(deliveryData);
    if (!filebaseUrl) {
      setLoading(false);
      return;
    }

    try {
      await writeContract({
        ...contractConfig,
        functionName: "registerOrder",
        args: [filebaseUrl], // ✅ Store only the Filebase URL on the blockchain
      });

      setLoading(false);
      Alert.alert("Success", `Order #${orderId} stored on blockchain!`);

      // ✅ Redirect to Delivery Details
      navigation.navigate("DeliveryDetails", { orderId });
    } catch (error) {
      setLoading(false);
      console.error("Transaction Failed:", error);
      Alert.alert("Transaction Failed", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      {/* Map View */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0074D9"
            style={styles.loader}
          />
        ) : (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: location?.latitude || 40.7128,
              longitude: location?.longitude || -74.006,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {/* Pickup Marker */}
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Pickup Location"
                description={pickupAddress}
              />
            )}

            {/* Delivery Marker */}
            {destination && (
              <Marker
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                title="Drop-off Location"
              />
            )}
          </MapView>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Schedule Delivery</Text>

        {/* Pickup Location */}
        <View style={styles.inputContainer}>
          <Image source={locationIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Pickup Location"
            value={pickupAddress}
            onChangeText={setPickupAddress}
          />
        </View>

        {/* Delivery Location */}
        <View style={styles.inputContainer}>
          <Image source={dropoffIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Delivery Location"
            value={deliveryLocation}
            onChangeText={handleSetDestination}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity
            style={styles.dateTimeInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar"
              size={24}
              color="#ccc"
              style={styles.icons}
            />
            <Text style={styles.dateTimeText}>{date.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimeInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time" size={24} color="#ccc" style={styles.icons} />
            <Text style={styles.dateTimeText}>{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Vehicle Type Selection */}
        <Text style={styles.vehicleTitle}>Vehicle Type</Text>
        <View style={styles.vehicleContainer}>
          {["bike", "car", "van"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.vehicleButton,
                selectedVehicle === type && styles.selectedVehicle,
              ]}
              onPress={() => handleVehicleSelection(type)}
            >
              <Image
                source={type === "bike" ? bike : type === "car" ? car : van}
                style={styles.vehicleImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? "Processing..." : "Submit & Proceed"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  mapContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  infoBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 450,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    fontWeight: "600",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    resizeMode: "contain",
  },
  icons: {
    marginRight: 8,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    height: 45,
  },
  vehicleTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginVertical: 10,
    color: "#666",
  },
  vehicleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  vehicleButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 27,
    paddingBottom: 27,
    paddingRight: 29,
    paddingLeft: 29,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,

    width: 97,
    height: 81,
  },
  selectedVehicle: {
    borderColor: "#0074D9",
    backgroundColor: "#DCE4FF66",
  },
  vehicleImage: {
    marginBottom: 5,
    resizeMode: "contain",
  },
  vehicleText: {
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#FF851B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#F2F2F2",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "start",

    gap: 14,
  },
  dateTimeInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 51,
  },
  dateTimeText: { marginLeft: 8, fontSize: 16, color: "#333" },
});
