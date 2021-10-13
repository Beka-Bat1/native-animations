import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";

const FlipCard = () => {
  let _value = 0;
  let animationValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    animationValue.addListener(({ value }) => (_value = value));

    () => animationValue.removeAllListeners();
  });

  const onAnimationStart = () => {
    console.log(_value);
    _value == 1
      ? Animated.timing(animationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start()
      : Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
  };

  const rotateFront = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const rotateBack = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimationStyle = {
    transform: [
      {
        rotateX: rotateFront,
      },
    ],
  };

  const backAnimationStyle = {
    transform: [
      {
        rotateX: rotateBack,
      },
    ],
  };

  return (
    <View style={st.container}>
      <Pressable onPress={onAnimationStart}>
        <Animated.View style={[st.card, frontAnimationStyle]}>
          <Text style={st.text}> What the biggest animal ?</Text>
        </Animated.View>

        <Animated.View style={[st.card, backAnimationStyle, st.backBoxStyle]}>
          <Text style={st.text}>The Whale</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FlipCard;

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    marginVertical: 10,
    backfaceVisibility: "hidden",
    height: 200,
    width: 200,
  },
  text: {
    textAlign: "center",
  },
  backBoxStyle: {
    position: "absolute",
    top: 0,
  },
});
