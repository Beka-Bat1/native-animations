import React, { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  PanResponder,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const BALL_SIZE = 40;

const MoveBox = () => {
  const [state, setState] = useState({ zone: "" });
  let animationValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  let _x = 0;
  let _y = 0;

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !!getDirectionAndColor(gestureState),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        animationValue.extractOffset();
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event(
          [
            null,
            {
              dx: animationValue.x,
              dy: animationValue.y,
            },
          ],
          { useNativeDriver: false }
        );
        const drag: string = getDirectionAndColor(gestureState) || "";
        setState({
          zone: drag,
        });

        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        Animated.decay(animationValue, {
          velocity: { x: gestureState.vx, y: gestureState.vy },
          deceleration: 0.997,
          useNativeDriver: true,
        }).start();

        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
    console.log("directions", {
      moveX,
      moveY,
      dx,
      dy,
    });
    const draggedDown = dy > 30;
    const draggedUp = dy < -30;
    const draggedLeft = dx < -30;
    const draggedRight = dx > 30;

    const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
    const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
    const isLeft = width - moveX - BALL_SIZE < 10;
    console.log(isLeft, width);

    let dragDirection = "";

    if (draggedDown || draggedUp) {
      if (draggedDown) dragDirection += "dragged down ";
      if (draggedUp) dragDirection += "dragged up ";
    }

    if (draggedLeft || draggedRight) {
      if (draggedLeft) dragDirection += "dragged left ";
      if (draggedRight) dragDirection += "dragged right ";
    }

    if (isRed) return `red ${dragDirection}`;
    if (isBlue) return `blue ${dragDirection}`;
    if (isLeft) return `left wall ${dragDirection}`;
    if (dragDirection) return dragDirection;
  };

  useEffect(() => {
    const animListener = animationValue.addListener((value) => {
      _x = value.x;
      _y = value.y;
    });

    () => animationValue.removeListener(animListener);
  }, []);

  const animationStyle = {
    transform: animationValue.getTranslateTransform(),
  };

  return (
    <View style={st.container}>
      <Text>{state.zone}</Text>
      <Animated.View
        style={[st.ball, animationStyle]}
        {...panResponder.panHandlers}
      >
        <Text>move around</Text>
      </Animated.View>
    </View>
  );
};

export default MoveBox;

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "blue",
    borderRadius: 200,
    paddingVertical: 45,
    paddingHorizontal: 25,
    marginVertical: 10,
    backfaceVisibility: "hidden",
    height: BALL_SIZE,
    width: BALL_SIZE,
  },
});
