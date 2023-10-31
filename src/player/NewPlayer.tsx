import {
  View,
  Text,
  useWindowDimensions,
  useAnimatedValue,
  PanResponder,
  ScrollView,
  Image,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';

const NewPlayer = () => {
  const {width, height} = useWindowDimensions();

  const animation = useRef(
    new Animated.ValueXY({x: 0, y: height - 80}),
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },

      onPanResponderGrant: (event, gestureState) => {
        animation.extractOffset();
      },
      onPanResponderMove: (event, gestureState) => {
        animation.setValue({x: 0, y: gestureState.dy});
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(animation.y, {
            toValue: -height + 80,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(animation.y, {
            toValue: height - 80,
            tension: 1,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  );

  let animatedImageHeight = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [200, 32],
    extrapolate: 'clamp',
  });

  let animatedSongTitleOpacity = animation.y.interpolate({
    inputRange: [0, height - 500, height - 90],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  let animatedHeaderHeight = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [height / 2, 90],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View className="flex-1 bg-neutral-600">
      <Animated.View
        style={{transform: animation.getTranslateTransform()}}
        className="flex-1 absolute  top-0 bottom-0 right-0 left-0 bg-blue-200">
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            height: animatedHeaderHeight,
          }}
          className="flex-row items-center mt-2 ">
          <Animated.View className=" ml-4 ">
            <Image
              style={{width: null, height: null}}
              source={{
                uri: 'https://c.saavncdn.com/599/Panandalian-Good-For-A-Time-Tagalog-2022-20220715144646-500x500.jpg',
              }}
              className="flex-1"
            />
          </Animated.View>

          <Animated.View className="ml-3">
            <Animated.Text className="text-white">Thi sis song </Animated.Text>
            <Animated.Text className="text-white">Artist Name</Animated.Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default NewPlayer;
