import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/Foundation";
import st from "./styles";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ColorPicker = () => {
  const [state, setState] = useState({
    color: "#000",
    inputOpen: false,
  });

  const animation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const textInputRef = useRef(null);

  const handleToggle = () => {
    const toValue = state.inputOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start();

    setState((prev) => ({
      ...prev,
      inputOpen: !prev.inputOpen,
    }));
  };

  const toggleInput = () => {
    const toValue = state.inputOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start();

    setState((prev) => ({
      ...prev,
      inputOpen: !prev.inputOpen,
    }));
  };

  const scaleXInterpolates = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });

  const moveInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0],
  });

  const colorRowInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.01],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const opacityIconInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const iconTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const inputOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const rowStyle = {
    opacity: animation,
    transform: [
      {
        translateY: translateYInterpolate,
      },
      {
        scaleX: scaleXInterpolates,
      },
      {
        scaleY: animation,
      },
    ],
  };

  const buttonStyle = {
    transform: [
      {
        translateX: moveInterpolate,
      },
      {
        scale: buttonAnimation,
      },
    ],
  };

  const iconStyle = {
    opacity: opacityIconInterpolate,
    transform: [
      {
        translateX: iconTranslate,
      },
    ],
  };

  const colorRowStyles = {
    opacity: colorRowInterpolate,
  };

  const inputStyle = {
    opacity: inputOpacityInterpolate,
  };

  return (
    <View style={st.container}>
      <Animated.View style={[rowStyle, st.rowWrap]}>
        <TouchableWithoutFeedback onPress={toggleInput}>
          <Animated.View style={[st.colorBall, colorRowStyles]} />
        </TouchableWithoutFeedback>

        <View style={st.row}>
          <TouchableOpacity>
            <AnimatedIcon
              name="bold"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="italic"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="align-center"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="link"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>

          <Animated.View
            style={[StyleSheet.absoluteFill, st.colorRowWrap, colorRowStyles]}
            pointerEvents={state.inputOpen ? "auto" : "none"}
          >
            <AnimatedTextInput
              value={state.color}
              style={[st.input, inputStyle]}
              onChangeText={(color) =>
                setState((prev) => ({
                  ...prev,
                  color: color,
                }))
              }
              ref={textInputRef}
            />
            <TouchableWithoutFeedback onPress={toggleInput}>
              <Animated.View style={[st.okayButton, buttonStyle]}>
                <Text style={st.okayText}>OK</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </Animated.View>

      <TouchableOpacity onPress={handleToggle} style={st.button}>
        <Text>Toggle Open/Closed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ColorPicker;
