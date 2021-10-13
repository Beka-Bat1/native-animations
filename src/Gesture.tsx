import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { block, useAnimatedGestureHandler } from "react-native-reanimated";
import { RADIUS, DELTA } from "./Quadrant";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});

cosnt blockValue = (oldVal: number, newVal: number) => {
  'worklet',
  if((oldVal > 1.5 * PI && newVal < 2) || newVal === 0 ){
    return 2* PI
  }


  if(oldVal < PI / 2 && newVal > 1.5 * PI) {
    return 0.001
  }

  return newVal
}

interface GestureProps {
  theta: Animated.SharedValue<number>
}

const Gesture = ({theta}: GestureProps) => {

  const ongestureEvent = useAnimatedGestureHandler<PanGestureHnadlerGestureEvent, {offset: number}>({
    onActive: ({x, y}) => {
      const newVal = normalizeRad(canvas2Polar({x, y}, { x: RADIUS, y: RADIUS })
      theta.value = blockValue(ctx.offset, newVal);
      ctx.offset = theta.value
    },
    onStart: (_, ctx) => {
      ctx.offset = theta.value;

    }
  })
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent} >
      <Animated.View style={styles.quadrant} />

      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
