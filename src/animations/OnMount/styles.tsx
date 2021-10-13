import { StyleSheet } from "react-native";

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.25)",
    paddingVertical: 10,
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
});

export default st;
