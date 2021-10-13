import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AnimatedQuestions = () => {
  const textPosition = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const questions = [
    "Do you tend to follow directions when given when given when given when given when given?",
    "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
    "Would you enjoy making sure your customers leave happy?",
    "Are you willing to work nights and weekends (and possibly holidays)?",
    "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
    "Would you enjoy making sure your customers leave happy?",
    "Do you tend to follow directions when given when given when given when given when given?",
    "Are you willing to work nights and weekends (and possibly holidays)?",
  ];

  const handleReset = () => {
    textPosition.setValue(0);
    progress.setValue(0);
    setIndex(0);
  };

  const handleAnswer = () => {
    Animated.timing(textPosition, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIndex((prev) => prev + 1);
        textPosition.setValue(0);
      }
    });

    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(textPosition, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => prev + 1);
      textPosition.setValue(0);
    });
  };

  const nextQuestionInterpolate = textPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const mainQuestionInterpolate = textPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const progressInterpolate = progress.interpolate({
    inputRange: [0, questions.length - 1],
    outputRange: [0, width * 2],
    extrapolate: "clamp",
  });

  const progressStyle = {
    transform: [{ scaleX: progressInterpolate }],
  };

  const mainQuestionStyle = {
    transform: [
      {
        translateX: mainQuestionInterpolate,
      },
    ],
  };

  const nextQuestionStyle = {
    transform: [
      {
        translateX: nextQuestionInterpolate,
      },
    ],
  };

  let question = questions[index];
  let nextQuestion;
  if (index + 1 < questions.length) {
    nextQuestion = questions[index + 1];
  } else {
    question = (
      <TouchableOpacity
        hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
        style={[st.button, { position: "absolute" }]}
        onPress={handleReset}
        activeOpacity={0.5}
      >
        <AntDesign name="reload1" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={st.container}>
      <View style={[st.overlay, StyleSheet.absoluteFill]}>
        <Animated.Text style={[st.questionText, mainQuestionStyle]}>
          {question}
        </Animated.Text>
        <Animated.Text style={[st.questionText, nextQuestionStyle]}>
          {nextQuestion}
        </Animated.Text>
      </View>
      <View style={st.progress}>
        <Animated.View style={[st.bar, progressStyle]} />
      </View>
      <View style={st.bottomContainer}>
        <TouchableOpacity
          hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
          style={[st.button]}
          onPress={handleAnswer}
          activeOpacity={0.5}
        >
          <Text style={st.no}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[st.button]}
          onPress={handleAnswer}
          activeOpacity={0.5}
        >
          <Text style={st.yes}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimatedQuestions;

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    paddingHorizontal: 20,
  },
  progress: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
    width: 1,
    backgroundColor: "red",
  },
  bar: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  bottomContainer: {
    marginTop: height - 90,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 27,
  },
  button: {
    height: 40,
    width: 60,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
  },
  text: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    position: "absolute",
  },
  nextQuestion: {
    position: "absolute",
  },
  no: {
    color: "red",
  },
  yes: {
    color: "green",
  },
});
