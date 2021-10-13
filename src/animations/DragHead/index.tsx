import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";

const DragHead = () => {
  const [state, setstate] = useState({
    heads: [
      {
        image:
          "https://cdn-images-1.medium.com/max/1200/1*NpUUls7kjn9JhO4ChjGV7w.png",
        animation: useRef(new Animated.ValueXY()).current,
        text: "Press Me",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZD-VsytAMF7-0NASGAtycgVAt5g-6ln4gQ&usqp=CAU",
        animation: useRef(new Animated.ValueXY()).current,
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEeRallp1z7XTgI7wS7Kez1AlOoqruX9bKVA&usqp=CAU",
        animation: useRef(new Animated.ValueXY()).current,
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvPqrVSlP4257woE3nieg7UZXU-XQEi_a1nQ&usqp=CAU",
        animation: useRef(new Animated.ValueXY()).current,
      },
      {
        image: "https://avatars.githubusercontent.com/u/1071625?",
        animation: useRef(new Animated.ValueXY()).current,
      },
    ],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: () => true,
      onPanResponderGrant: (e, gestureState) => {
        state.heads.map(({ animation }) => {
          // important
          animation.extractOffset();
          animation.setValue({ x: 0, y: 0 });
        });
      },
      onPanResponderMove: (e, gestureState) => {
        state.heads[0].animation.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });

        const animations = state.heads.slice(1).map(({ animation }, index) => {
          Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: { x: gestureState.dx, y: gestureState.dy },
              useNativeDriver: true,
            }),
          ]).start();
        });
      },
    })
  ).current;

  return (
    <View style={st.container}>
      {state.heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          const pan =
            index === items.length - 1 ? panResponder.panHandlers : {};

          return (
            <Animated.Image
              {...pan}
              key={index}
              source={{ uri: item.image }}
              style={[
                st.circle,
                {
                  transform: item.animation.getTranslateTransform(),
                },
              ]}
            />
          );
        })}
    </View>
  );
};

export default DragHead;

const DIAMETER = 120;

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    position: "absolute",
  },
});
