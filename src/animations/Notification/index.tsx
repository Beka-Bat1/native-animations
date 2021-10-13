import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Animated,
} from "react-native";

const NOTIFICATION_HEIGHT = 80;

const Notification = () => {
  const [notificationValue, setNotificationValue] = useState(" ");

  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const notificationHandler = () => {
    Animated.parallel([
      Animated.spring(position.y, {
        toValue: NOTIFICATION_HEIGHT,
        tension: 60,
        friction: 5,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        Animated.parallel([
          Animated.spring(position.y, {
            toValue: -NOTIFICATION_HEIGHT,
            useNativeDriver: true,
          }),

          Animated.timing(opacity, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  };

  const notificationStyles = {
    transform: [...position.getTranslateTransform()],
    opacity: opacity,
  };

  const textAnimation = {
    opacity: opacity,
  };

  return (
    <View style={st.container}>
      <Animated.View style={[st.notificationContainer, notificationStyles]}>
        <Animated.Text style={[st.text, textAnimation]}>
          {notificationValue}
        </Animated.Text>
      </Animated.View>

      <View style={st.textInputContainer}>
        <TextInput
          value={notificationValue}
          onChangeText={setNotificationValue}
          style={st.textInput}
        />

        <Button
          title="Send Notification"
          onPress={notificationHandler}
          color="#f194ff"
        />
      </View>
    </View>
  );
};

export default Notification;

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  textInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: "70%",
    backgroundColor: "#EFEFEF",
    marginVertical: 8,
  },
  notificationContainer: {
    height: NOTIFICATION_HEIGHT,
    width: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -NOTIFICATION_HEIGHT,
  },
});
