import { StyleSheet } from "react-native";

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowWrap: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "50%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
  },

  colorRowWrap: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
  },
  okayButton: {
    borderRadius: 20,
    height: "100%",
    width: 40,
    backgroundColor: "#309EEB",
    alignItems: "center",
    justifyContent: "center",
  },
  okayText: {
    color: "#FFF",
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  button: {
    marginTop: 50,
  },
});


export default st
