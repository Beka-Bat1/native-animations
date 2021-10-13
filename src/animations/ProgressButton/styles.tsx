import { StyleSheet } from "react-native";

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "transparent",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 2,
  },
  opacityBackground: {
    // backgroundColor: "rgba(255,255,255,.5)",
  },
});

export default st;
