import React, { forwardRef, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

import Background from "./background.jpg";

import st from "./styles";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const OnMount = () => {
  const email = useRef(new Animated.Value(0)).current;
  const password = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(email, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      Animated.timing(password, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(button, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const createAnimatedStyles = (animation: Animated.Value) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-5, 0],
    });

    return {
      opacity: animation,
      transform: [
        {
          translateY,
        },
      ],
    };
  };

  const emailStyles = createAnimatedStyles(email);
  const passwordStyle = createAnimatedStyles(password);
  const buttonStyle = createAnimatedStyles(button);

  return (
    <View style={st.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View style={st.container} />
        <KeyboardAvoidingView style={st.form} behavior="padding">
          <View style={st.container}>
            <Text style={st.title}>Login</Text>
              {/* keyboardType */}
            <AnimatedTextInput
              style={[st.input, emailStyles]}
              placeholder="Email"
              keyboardType="email-address"
            />

            <AnimatedTextInput
              placeholder="Password"
              style={[st.input, passwordStyle]}
              secureTextEntry
            />

            <TouchableOpacity>
              <Animated.View style={[st.button, buttonStyle]}>
                <Text style={st.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={st.container} />
      </ImageBackground>
    </View>
  );
};

export default OnMount;
