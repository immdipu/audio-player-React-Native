import {
  View,
  Text,
  useWindowDimensions,
  PanResponder,
  Pressable,
  BackHandler,
  Animated,
} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import clsx from 'clsx';
import ArrowDown from '../icons/ArrowDown';
import DowMenu from '../icons/DotMenu';
import SliderComponent from './Slider';
import PlayerControls from './PlayerControls';
import {useAppContext} from '../context/AppContext';
import SongImage from './SongImage';
import SongTitle from './SongTitle';

const NewPlayer = () => {
  const {width, height} = useWindowDimensions();
  const {isExpanded, setIsExpanded} = useAppContext();

  const animation = useRef(new Animated.Value(60)).current;
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // if (
          //   (gestureState.dy < 0 && gestureState.moveY > height / 2) ||
          //   (gestureState.dy > 0 && gestureState.moveY < height / 2) ||
          //   (gestureState.moveY > height / 2 && gestureState.dy > 0)
          // ) {
          //   return true;
          // }
          return true;
        },
        onPanResponderGrant: () => {
          animation.extractOffset();
        },
        onPanResponderMove: (event, gestureState) => {
          // animation.setValue({x: 0, y: gestureState.dy});
          let values = height - (gestureState.moveY + 140);
          console.log('values', values);
          // animation.setValue(values);
        },
        onPanResponderRelease: (event, gestureState) => {
          if (gestureState.dy > 0 && gestureState.moveY >= height / 2) {
            console.log('force scrolling down');
            console.log('scrolling down', animation);
            Animated.timing(animation, {
              toValue: 0,
              duration: 120,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy > 0 && gestureState.moveY < height / 2) {
            console.log(' scrolling down');
            setIsExpanded(false);
            Animated.timing(animation, {
              toValue: -height,
              duration: 400,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy < 0 && gestureState.moveY >= height / 2) {
            console.log('scrolling up');
            setIsExpanded(true);
            Animated.timing(animation, {
              toValue: height,
              duration: 230,
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy < 0 && gestureState.moveY < height - 120) {
            console.log('force scrolling up');
            Animated.spring(animation, {
              toValue: 0,
              tension: 10,
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [isExpanded],
  );

  useEffect(() => {
    const backHandlerSubscription = () => {
      console.log('backhandler');
      if (isExpanded) {
        setIsExpanded(false);
        Animated.timing(animation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();

        return true;
      }
      return false;
    };

    const backaction = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandlerSubscription,
    );

    return () => {
      return backaction.remove();
    };
  }, []);

  let animatedImageHeight = animation.interpolate({
    inputRange: [60, height],
    outputRange: [50, height * 0.39],
    extrapolate: 'clamp',
  });

  let animatedImageWidth = animation.interpolate({
    inputRange: [60, height],
    outputRange: [50, width * 0.86],
    extrapolate: 'clamp',
  });

  let TextFont = animation.interpolate({
    inputRange: [60, height],
    outputRange: [16, 25],
    extrapolate: 'clamp',
  });

  let TextContainerMaring = animation.interpolate({
    inputRange: [60, height],
    outputRange: [15, 27],
    extrapolate: 'clamp',
  });
  let AnimatedBorderRadius = animation.interpolate({
    inputRange: [60, height],
    outputRange: [6, 15],
    extrapolate: 'clamp',
  });

  let AnimateControlY = animation.interpolate({
    inputRange: [60, height],
    outputRange: [-70, 5],
    extrapolate: 'clamp',
  });
  let AnimateControlWidth = animation.interpolate({
    inputRange: [60, height],
    outputRange: [150, width],
    extrapolate: 'clamp',
  });
  let AnimateControlRight = animation.interpolate({
    inputRange: [60, height],
    outputRange: [-240, 0],
    extrapolate: 'clamp',
  });

  let AnimateControlBotton = animation.interpolate({
    inputRange: [60, height],
    outputRange: [80, 0],
    extrapolate: 'clamp',
  });
  let MarginHorizontal = animation.interpolate({
    inputRange: [60, height],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });
  let PlayerBorderRadius = animation.interpolate({
    inputRange: [60, height],
    outputRange: [5, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        height: animation,
        bottom: AnimateControlBotton,
        marginHorizontal: MarginHorizontal,
        borderRadius: PlayerBorderRadius,
      }}
      // style={{transform: animation.getTranslateTransform()}}
      className={clsx(
        'flex-1 absolute  z-10   bg-neutral-900  right-0 left-0',
        isExpanded && 'top-0',
      )}>
      <Animated.View
        {...panResponder.panHandlers}
        className={clsx(
          'ease-linear duration-100 items-center ',
          isExpanded ? 'flex-col items-center' : 'flex-row pl-3 pr-2   ',
        )}>
        <View
          className={clsx(
            'px-4 flex-row  w-full  justify-between',
            !isExpanded && 'hidden',
          )}>
          <Pressable
            className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
            onPress={() => {
              setIsExpanded(false);
              Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
              }).start();
            }}
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

          className={clsx(
            'overflow-hidden ',
            isExpanded ? 'flex-col mt-5' : 'flex-row justify-start pt-2 ',
          )}
          style={{
            height: animatedImageHeight,
            width: animatedImageWidth,
            borderRadius: AnimatedBorderRadius,
            // transform: [{translateY: -4}],
          }}>
          <SongImage />
        </Animated.View>

        <Animated.View
          style={{
            marginHorizontal: TextContainerMaring,
          }}
          className={' mb-1 '}>
          <SongTitle TextFont={TextFont} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={clsx(
              '  tracking-wide ',
              isExpanded
                ? 'font-normal text-neutral-200 text-base text-center'
                : 'text-xs text-start text-neutral-400',
            )}>
            Benjamin Kheng
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        // style={{transform: [{translateY: AnimateSlider}]}}
        className={clsx(
          isExpanded ? 'w-full' : 'right-0 px-1 left-0 w-full top-2 absolute ',
        )}>
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
        className="   ">
        <PlayerControls />
      </Animated.View>
    </Animated.View>
  );
};

export default NewPlayer;
