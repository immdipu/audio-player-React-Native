import {
  View,
  Text,
  useWindowDimensions,
  useAnimatedValue,
  PanResponder,
  ScrollView,
  Image,
  Pressable,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import ArrowDown from '../icons/ArrowDown';
import DowMenu from '../icons/DotMenu';
import SliderComponent from './Slider';
import PlayerControls from './PlayerControls';
import {useAppContext} from '../context/AppContext';

const NewPlayer = () => {
  const {width, height} = useWindowDimensions();
  const {isExpanded, setIsExpanded} = useAppContext();

  const animation = useRef(
    new Animated.ValueXY({x: 0, y: height - 80}),
  ).current;
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          if (
            (gestureState.dy < 0 && gestureState.moveY > height / 2) ||
            (gestureState.dy > 0 && gestureState.moveY < height / 2) ||
            (gestureState.moveY > height / 2 && gestureState.dy > 0)
          ) {
            return true;
          }
          return false;
        },
        onPanResponderGrant: (event, gestureState) => {
          animation.extractOffset();
        },
        onPanResponderMove: (event, gestureState) => {
          animation.setValue({x: 0, y: gestureState.dy});
        },
        onPanResponderRelease: (event, gestureState) => {
          console.log('MoveY', gestureState.moveY);
          console.log('dy', gestureState.dy);

          if (gestureState.moveY > height / 2 && gestureState.dy > 0) {
            console.log('force scrolling down');
            Animated.timing(animation.y, {
              toValue: 0,
              duration: 120,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy > 0 && gestureState.moveY < height / 2) {
            console.log(' scrolling down');
            setIsExpanded(false);
            Animated.timing(animation.y, {
              toValue: height - 80,
              duration: 120,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy < 0 && gestureState.moveY >= height / 2) {
            console.log('scrolling up');
            setIsExpanded(true);
            Animated.timing(animation.y, {
              toValue: -height + 80,
              duration: 230,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy < 0 && gestureState.moveY < height - 120) {
            console.log('force scrolling up');
            Animated.spring(animation.y, {
              toValue: 0,
              tension: 10,
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [isExpanded],
  );

  let animatedImageHeight = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [height * 0.39, 58],
    extrapolate: 'clamp',
  });

  let animatedImageWidth = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [width * 0.86, 58],
    extrapolate: 'clamp',
  });
  let ImagetranslateX = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });
  let TextFont = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [25, 16],
    extrapolate: 'clamp',
  });
  let AnimatedFontBold = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [600, 500],
    extrapolate: 'clamp',
  });
  let TextContainerMaring = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [27, 5],
    extrapolate: 'clamp',
  });
  let AnimatedBorderRadius = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [27, 6],
    extrapolate: 'clamp',
  });
  let AnimateSlider = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [5, -70],
    extrapolate: 'clamp',
  });
  let AnimateControlY = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [5, -100],
    extrapolate: 'clamp',
  });
  let AnimateControlWidth = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [width, 150],
    extrapolate: 'clamp',
  });
  let AnimateControlRight = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [0, -240],
    extrapolate: 'clamp',
  });
  let AnimateControlX = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [5, 0],
    extrapolate: 'clamp',
  });

  console.log('rendering');

  return (
    <Animated.View
      style={{transform: animation.getTranslateTransform()}}
      className="flex-1 absolute bottom-0   top-0 right-0 left-0 bg-blue-500">
      <Animated.View
        {...panResponder.panHandlers}
        className={clsx(
          'ease-linear duration-100 items-center ',
          // isExpanded ? 'flex-col items-center' : 'flex-row ',
        )}>
        <View
          className={clsx(
            'px-4 mt-2 flex-row w-full mb-2 justify-between',
            !isExpanded && 'hidden',
          )}>
          <Pressable
            className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
            onPress={() => {}}
            android_ripple={{
              color: '#4d4c4a',
              borderless: false,
              foreground: false,
              radius: 20,
            }}>
            <ArrowDown />
          </Pressable>
          <Pressable
            className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
            android_ripple={{
              color: '#4d4c4a',
              borderless: false,
              foreground: false,
              radius: 20,
            }}>
            <DowMenu />
          </Pressable>
        </View>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles

          className=" "
          style={{
            height: animatedImageHeight,
            width: animatedImageWidth,
            transform: [{translateX: ImagetranslateX}],
          }}>
          <Animated.Image
            className="w-full h-full "
            style={{borderRadius: AnimatedBorderRadius}}
            source={{
              uri: 'https://c.saavncdn.com/599/Panandalian-Good-For-A-Time-Tagalog-2022-20220715144646-500x500.jpg',
            }}
          />
        </Animated.View>

        <Animated.View
          style={{
            marginHorizontal: TextContainerMaring,
          }}
          className={'py-2 border'}>
          <Animated.Text
            style={{
              fontSize: TextFont,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white font-medium tracking-tighter">
            Good For A Time daks dja sod jdso ojdo knlf
          </Animated.Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={clsx(
              '  tracking-wide ',
              isExpanded
                ? 'font-normal text-neutral-200 text-base text-center'
                : 'text-xs text-start text-neutral-400',
            )}>
            Benjamin Kheng dlgkas dofj
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{transform: [{translateY: AnimateSlider}]}}
        className="w-full">
        <SliderComponent />
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [{translateY: AnimateControlY}],
            width: AnimateControlWidth,
            right: AnimateControlRight,
          },
        ]}
        className=" border  ">
        <PlayerControls />
      </Animated.View>
    </Animated.View>
  );
};

export default NewPlayer;