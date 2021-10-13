import React, { Component, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import clamp from "clamp";

import Card from "./Card";

const SWIPE_THRESHOLD = 120;

const ChooseCard = () => {
  const [state, setState] = useState({
    items: [
      {
        image:
          "https://sm.mashable.com/mashable_sea/photo/default/man-fakes-death-cat-q6u_2z9w.png",
        id: 1,
        text: "Sweet Cat",
      },
      {
        image:
          "https://thumbs.dreamstime.com/b/beautiful-random-cat-street-217411773.jpg",
        id: 2,
        text: "Sweet Cat",
      },
      {
        image:
          "https://cutecatshq.com/wp-content/uploads/2018/10/Random-cat-i-saw-on-the-street.jpg",
        id: 3,
        text: "Sweet Cat",
      },
      {
        image:
          "https://ae01.alicdn.com/kf/H1d5a64a6a4ab47079641647abce94d0fF/Fashion-Cat-Sunglasses-Pet-Accessories-Summer-Dogs-Cats-Glasses-Grooming-Black-Green-Color-random.jpg_Q90.jpg_.webp",
        id: 4,
        text: "Sweet Cat",
      },
      {
        image:
          "https://stickerly.pstatic.net/sticker_pack/13279e882d3a25af/YYN2BA/2/00111d64-0f41-4f81-a210-563a24c9e2cd-018.png",
        id: 5,
        text: "Sweet Cat",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDpPM86Jl_HF6doOQvtkQOb_91WekPG1_SQ&usqp=CAU",
        id: 6,
        text: "Sweet Cat",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRRdIHbbDfn_43-PdVfjeOc5rmYbCmaTP9A&usqp=CAU",
        id: 7,
        text: "Sweet Cat",
      },
    ],
  });

  const animation = useRef(new Animated.ValueXY()).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const next = useRef(new Animated.Value(0.9)).current;

  const transitionNext = () => {
    Animated.parallel(
      [
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.spring(next, {
          toValue: 1,
          speed: 200,
          useNativeDriver: true,
        }),
      ],
      { stopTogether: false }
    ).start(() => {
      setState((state) => ({
        items: state.items.slice(1),
      }));

      next.setValue(0.9);
      opacityAnim.setValue(1);
      animation.setValue({ x: 0, y: 0 });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animation.x,
            dy: animation.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
            useNativeDriver: true,
          }).start(transitionNext);
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: "clamp",
  });

  const opacity = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
  });

  const animatedCardStyles = {
    opacity: opacity,
    transform: [
      {
        rotate,
      },
      ...animation.getTranslateTransform(),
    ],
  };

  const animatedImageStyles = {
    opacity,
  };

  const handleNo = () => {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };

  const handleYes = () => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };

  const yesOpacity = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
  });
  const yesScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: "clamp",
  });
  const noOpacity = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
  });

  const noScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: "clamp",
  });

  const animatedNopeStyles = {
    transform: [{ scale: noScale }, { rotate: "30deg" }],
    opacity: noOpacity,
  };

  const animatedYupStyles = {
    transform: [{ scale: yesScale }, { rotate: "-30deg" }],
    opacity: yesOpacity,
  };

  return (
    <View style={st.container}>
      <View style={st.top}>
        {state.items
          .slice(0, 2)
          .reverse()
          .map(({ image, text, id }, index, items) => {
            console.log(index);
            const isLastItem = index === items.length - 1;

            const isSecondToLast = index === items.length - 2;

            const panHandlers = isLastItem ? panResponder.panHandlers : {};

            const imageStyle = isLastItem ? animatedImageStyles : undefined;

            const nextStyle = isSecondToLast
              ? {
                  transform: [{ scale: next }],
                }
              : null;

            const cardStyle = isLastItem ? animatedCardStyles : undefined;

            return (
              <Animated.View
                style={[st.card, cardStyle]}
                {...panHandlers}
                key={id}
              >
                <Animated.Image
                  source={{ uri: image }}
                  style={[st.image, imageStyle]}
                  resizeMode="cover"
                />
                <View style={st.lowerText}>
                  <Text>{text}</Text>
                </View>

                {isLastItem && (
                  <Animated.View style={[st.nope, animatedNopeStyles]}>
                    <Text style={st.nopeText}>Nope!</Text>
                  </Animated.View>
                )}

                {isLastItem && (
                  <Animated.View style={[st.yup, animatedYupStyles]}>
                    <Text style={st.yupText}>Yup!</Text>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
      </View>
      <View style={st.buttonBar}>
        <TouchableOpacity onPress={handleNo} style={[st.button, st.nopeButton]}>
          <Text style={st.nopeText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleYes} style={[st.button, st.yupButton]}>
          <Text style={st.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseCard;

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  yupButton: {
    shadowColor: "green",
  },
  nopeButton: {
    shadowColor: "red",
  },

  lowerText: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 2,
    flex: 3,
  },
  yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: "#FFF",
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: "#FFF",
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
  card: {
    width: 300,
    height: 300,
    position: "absolute",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
