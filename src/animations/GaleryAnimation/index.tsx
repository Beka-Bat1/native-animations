import React, { Component, useEffect, useRef, useState } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import images from "./images";
import st from "./styles";

const GalleryAnimation = () => {
  const viewImage = useRef(null);
  const size = useRef(new Animated.ValueXY()).current;
  const position = useRef(new Animated.ValueXY()).current;
  const animation = useRef(new Animated.Value(0)).current;

  const gridImages = useRef(null);

  const [state, setState] = useState({
    activeIndex: -1,
    x: null,
    y: null,
    width: null,
    height: null,
    activeImage: null,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      gridImages: {},
    }));
  }, []);

  const handleOpenImage = (index: number) => {
    !!gridImages &&
      gridImages[index].measure(
        (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
          setState((prev) => ({
            ...prev,
            x,
            y,
            width,
            height,
          }));

          position.setValue({
            x: pageX,
            y: pageY,
          });

          size.setValue({
            x: pageX,
            y: pageY,
          });

          setState((prev) => ({
            ...prev,
            activeImage: images[index],
            activeIndex: index,
          }));
        }
      );
  };

  useEffect(() => {
    viewImage &&
      viewImage.current.measure(
        (
          tX: any,
          tY: any,
          tWidth: any,
          tHeight: any,
          tPageX: any,
          tPageY: any
        ) => {
          Animated.parallel([
            Animated.spring(position.x, {
              toValue: tPageX,
              useNativeDriver: false,
            }),
            Animated.spring(position.y, {
              toValue: tPageY,
              useNativeDriver: false,
            }),
            Animated.spring(position.y, {
              toValue: tWidth,
              useNativeDriver: false,
            }),
            Animated.spring(position.y, {
              toValue: tHeight,
              useNativeDriver: false,
            }),
            Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        }
      );
  }, [viewImage]);

  const animatedContentTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const animatdContentStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animatedContentTranslate,
      },
    ],
  };

  const activeImageStyle = {
    width: size.x,
    height: size.y,
    top: position.y,
    left: position.x,
  };

  const activeIndexStyle = {
    opacity: !!state.activeImage ? 0 : 1,
  };

  const animatedCloseStyle = {
    opacity: animation,
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: state.x!,
        duration: 250,
        useNativeDriver: false,
      }),

      Animated.timing(position.y, {
        toValue: state.y!,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.x, {
        toValue: state.width!,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.y, {
        toValue: state.height!,
        duration: 250,
        useNativeDriver: false,
      }),

      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setState((prev) => ({
        ...prev,
        activeImage: null,
      }));
    });
  };

  return (
    <View style={st.container}>
      <ScrollView style={st.container}>
        {images.map((src, index: number) => {
          const style =
            index == state.activeIndex ? activeIndexStyle : undefined;

          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleOpenImage(index)}
          >
            <Animated.Image
              ref={(ref: any) => (gridImages.current[index] = ref)}
              source={src}
              style={[st.gridImage, style]}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>;
        })}
      </ScrollView>

      {/* after animation */}
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={state.activeImage ? "auto" : "none"}
      >
        <View style={st.topContent} ref={viewImage} onLayout={() => {}}></View>

        {/* content */}
        <Animated.View style={[st.content, animatdContentStyle]}>
          <Text style={st.title}>Pretty Image from Unsplash</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis interdum porttitor. Nam lorem justo, aliquam id feugiat
            quis, malesuada sit amet massa. Sed fringilla lorem sit amet metus
            convallis, et vulputate mauris convallis. Donec venenatis tincidunt
            elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
            lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra
            tellus, et venenatis massa. Maecenas ac gravida purus, in porttitor
            nulla. Integer vitae dui tincidunt, blandit felis eu, fermentum
            lorem. Mauris condimentum, lorem id convallis fringilla, purus orci
            viverra metus, eget finibus neque turpis sed turpis.
          </Text>
        </Animated.View>

        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[st.close, animatedCloseStyle]}>
            <Text style={st.closeText}>X</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      <Animated.Image
        key={state.activeImage || "key"}
        source={
          state.activeImage || {
            uri: "https://picsum.photos/500/300?random=1",
          }
        }
        resizeMode="cover"
        style={[st.viewImage, activeImageStyle]}
      />
    </View>
  );
};

export default GalleryAnimation;
