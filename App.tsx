import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedQuestions from "./src/animations/AnimatedQuestions";
import ChooseCard from "./src/animations/ChooseCard";
import DragHead from "./src/animations/DragHead";
import FlipCard from "./src/animations/FlipCard";
import GalleryAnimation from "./src/animations/GaleryAnimation";
import MoveBox from "./src/animations/MoveBox";
import Notification from "./src/animations/Notification";
import OnMount from "./src/animations/OnMount";
import ProgressButton from "./src/animations/ProgressButton";
import ColorPicker from "./src/animations/ColorPicker";

export default function App() {
  return (
    <View style={styles.container}>
      <ColorPicker />
      <Text style={{ textAlign: "center" }}>
        This is Test Text Please do not notice me
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
