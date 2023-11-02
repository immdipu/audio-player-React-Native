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
        onPanResponderGrant: () => {
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
              duration: 400,
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

  useEffect(() => {
    const backHandlerSubscription = () => {
      console.log('backhandler');
      if (isExpanded) {
        setIsExpanded(false);
        Animated.timing(animation.y, {
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

  let TextFont = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [25, 16],
    extrapolate: 'clamp',
  });

  let TextContainerMaring = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [27, 15],
    extrapolate: 'clamp',
  });
  let AnimatedBorderRadius = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [27, 6],
    extrapolate: 'clamp',
  });

  let AnimateControlY = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [5, -82],
    extrapolate: 'clamp',
  });
  let AnimateControlWidth = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [width, 150],
    extrapolate: 'clamp',
  });
  let AnimateControlRight = animation.y.interpolate({
    inputRange: [0, height - 90],
    outputRange: [0, -270],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{transform: animation.getTranslateTransform()}}
      className="flex-1 absolute bottom-0  bg-neutral-800 top-0 right-0 left-0 ">
      <Animated.View
        {...panResponder.panHandlers}
        className={clsx(
          'ease-linear duration-100 items-center ',
          isExpanded ? 'flex-col items-center' : 'flex-row pl-3 pr-2 pt-2 ',
        )}>
        <View
          className={clsx(
            'px-4 mt-2 flex-row w-full mb-2 justify-between',
            !isExpanded && 'hidden',
          )}>
          <Pressable
            className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
            onPress={() => {
              setIsExpanded(false);
              Animated.timing(animation.y, {
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
            ' ',
            isExpanded ? 'flex-col' : 'flex-row justify-start ',
          )}
          style={{
            height: animatedImageHeight,
            width: animatedImageWidth,
          }}>
          <SongImage />
        </Animated.View>

        <Animated.View
          style={{
            marginHorizontal: TextContainerMaring,
          }}
          className={'  mb-4 '}>
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
          isExpanded ? 'w-full' : 'right-0 left-0 w-full top-2 absolute ',
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
