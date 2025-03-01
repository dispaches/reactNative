import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
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

export default commonStyles;