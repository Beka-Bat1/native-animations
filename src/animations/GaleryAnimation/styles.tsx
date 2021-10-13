import { StyleSheet } from "react-native";

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridImage: {
    width: "33%",
    height: 150,
  },
  viewImage: {
    width: undefined,
    height: undefined,
    position: "absolute",
    top: 0,
    left: 0,
  },
  topContent: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    backgroundColor: "transparent",
    fontSize: 28,
    color: "#FFF",
  },
});

export default st;
