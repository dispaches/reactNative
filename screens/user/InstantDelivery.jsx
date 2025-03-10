import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import bike from "../../assets/delivery/bike.png";
import car from "../../assets/delivery/car.png";
import van from "../../assets/delivery/van.png";
import locationIcon from "../../assets/delivery/location.png";
import dropoffIcon from "../../assets/delivery/dropofflocation.png";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function InstantDelivery() {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [pickupAddress, setPickupAddress] = useState("");
    const [destination, setDestination] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Get user's current location & address
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Location Permission Denied", "Enable location services to use the map.");
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
            await getAddressFromCoordinates(newLocation.coords.latitude, newLocation.coords.longitude);
            setLoading(false);
          }
        );
  
        return () => locationWatcher.remove();
      })();
    }, []);
  
    // Convert coordinates to a human-readable address
    async function getAddressFromCoordinates(lat, lng) {
      try {
        let addressResponse = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
        if (addressResponse.length > 0) {
          let formattedAddress = `${addressResponse[0].name}, ${addressResponse[0].city}, ${addressResponse[0].region}`;
          setPickupAddress(formattedAddress);
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    }
  
    function handleSetDestination(text) {
      setDeliveryLocation(text);
      if (text) {
        setDestination({ latitude: location.latitude + 0.01, longitude: location.longitude + 0.01 });
      }
    }
  
    function handleVehicleSelection(type) {
      setSelectedVehicle(type);
    }
  
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      {/* Map View */}
     {/* Map View */}
     <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0074D9" style={styles.loader} />
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
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Pickup Location"
                description={pickupAddress}
              />
            )}

            {/* Delivery Marker */}
            {destination && (
              <Marker
                coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                title="Drop-off Location"
              />
            )}
          </MapView>
        )}
      </View>


      {/* Info Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Instant Delivery</Text>

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

        {/* Vehicle Type Selection */}
        <Text style={styles.vehicleTitle}>Vehicle Type</Text>
        <View style={styles.vehicleContainer}>
          <TouchableOpacity
            style={[
              styles.vehicleButton,
              selectedVehicle === "bike" && styles.selectedVehicle,
            ]}
            onPress={() => handleVehicleSelection("bike")}
          >
            <Image source={bike} style={styles.vehicleImage} />
            {/* <Text style={styles.vehicleText}>Bike</Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.vehicleButton,
              selectedVehicle === "car" && styles.selectedVehicle,
            ]}
            onPress={() => handleVehicleSelection("car")}
          >
            <Image source={car} style={styles.vehicleImage} />
            {/* <Text style={styles.vehicleText}>Car</Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.vehicleButton,
              selectedVehicle === "van" && styles.selectedVehicle,
            ]}
            onPress={() => handleVehicleSelection("van")}
          >
            <Image source={van} style={styles.vehicleImage} />
            {/* <Text style={styles.vehicleText}>Van</Text> */}
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    height: 400,
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
});
