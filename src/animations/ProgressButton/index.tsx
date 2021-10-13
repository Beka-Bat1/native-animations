import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import st from "./styles";

const ProgressButton = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();

        progress.setValue(0);
      }
    });
  };

  

  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const colorInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
  });

  const progrsStyle = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: colorInterpolate,
  };

  return (
    <View style={st.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={st.button}>
          <View style={[StyleSheet.absoluteFill]}>
            <Animated.View
              style={[st.progress, progrsStyle, st.opacityBackground]}
            />
          </View>
          <Text style={st.buttonText}>Get it!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProgressButton;
