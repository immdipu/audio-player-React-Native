import {View, Text} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import Imagee from '../component/Image';
import {Previous, Next, Play, Pause, Heart, RepeatOne, Shuffle} from '../icons';
import {Pressable} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

export default function SongInfo() {
  const [play, setPlay] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const scalePlayPause = useSharedValue(1);
  const opacityPlayPause = useSharedValue(1);
  const scaleHeart = useSharedValue(1);
  const opacityHeart = useSharedValue(1);
  const [repeat, setRepeat] = React.useState<
    'repeatOne' | 'repeatAll' | 'shuffle'
  >('repeatOne');

  const togglePlayPauseAnimation = () => {
    scalePlayPause.value = 1;
    opacityPlayPause.value = 1;
    scalePlayPause.value = withSequence(
      withSpring(1.1, {damping: 2, stiffness: 80}),
      withTiming(1, {duration: 300, easing: Easing.inOut(Easing.ease)}),
    );
  };

  const toggleHeartAnimation = () => {
    // Reset Heart animation values
    scaleHeart.value = 1;
    opacityHeart.value = 1;

    if (!isLiked) {
      scaleHeart.value = withSequence(
        withSpring(1.27, {damping: 2, stiffness: 80}),
        withTiming(1, {duration: 170, easing: Easing.inOut(Easing.ease)}),
      );
    }
  };

  const PlayPauseStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scalePlayPause.value}],
      opacity: interpolate(opacityPlayPause.value, [0, 1], [0, 1]),
    };
  });

  const HeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleHeart.value}],
      opacity: interpolate(opacityHeart.value, [0, 1], [0, 1]),
    };
  });

  return (
    <View>
      <View className=" flex-row justify-center ">
        <Imagee
          heightMultiplier={0.8}
          widthMultiplier={0.83}
          url="https://c.saavncdn.com/599/Panandalian-Good-For-A-Time-Tagalog-2022-20220715144646-500x500.jpg"
        />
      </View>
      <View className=" py-2 mt-6">
        <Text className="text-white text-3xl tracking-tighter text-center font-semibold ">
          Good For A Time
        </Text>
        <Text className="text-neutral-200 text-center tracking-wide font-normal text-base">
          Benjamin Kheng
        </Text>
      </View>
      <View className="mt-5 mx-10">
        <View className="flex-row justify-between px-1">
          <Text className="text-neutral-300 font-medium font-serif text-base">
            00:00
          </Text>
          <Text className="text-neutral-300 font-medium font-serif text-base">
            00:00
          </Text>
        </View>

        <Slider
          value={50}
          maximumValue={100}
          minimumValue={0}
          thumbTintColor="white"
          maximumTrackTintColor="grey"
          minimumTrackTintColor="white"
          animateTransitions={true}
          animationType="timing"
          thumbTouchSize={{height: 45, width: 45}}
          trackStyle={{height: 6}}
          containerStyle={{height: 20}}
        />
      </View>
      <View className="  items-center  flex-row">
        {/* heart button */}
        <View className="w-20  ">
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={() => {
              toggleHeartAnimation();
              setIsLiked(!isLiked);
            }}
            className="flex-row mx-2 items   justify-center mt-5">
            <Animated.View style={HeartStyle}>
              {isLiked ? (
                <Heart color="#f53030" strokeColor="#f53030" />
              ) : (
                <Heart color="" strokeColor="#a7a9a9" />
              )}
            </Animated.View>
          </Pressable>
        </View>
        {/* play pause next previous control */}
        <View className="flex-row  flex-1  items-center justify-center ">
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={() => {
              setPlay(!play);
            }}
            className="flex-row  borde rounded-full  p-3 items-center justify-center mt-5">
            <Previous color="#d7dad9" />
          </Pressable>
          <Pressable
            onPress={() => {
              setPlay(!play);
              togglePlayPauseAnimation();
            }}
            className="flex-row mx-2   h-20 justify-center mt-5">
            <Animated.View style={PlayPauseStyle}>
              {play ? <Play /> : <Pause />}
            </Animated.View>
          </Pressable>
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={() => {
              setPlay(!play);
            }}
            className="flex-row  p-3 justify-center mt-5">
            <Next color="#d7dad9" />
          </Pressable>
        </View>
        {/* Reapeat button */}
        <View className="w-20   ">
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={() => {
              if (repeat === 'repeatOne') {
                setRepeat('repeatAll');
              } else if (repeat === 'repeatAll') {
                setRepeat('shuffle');
              } else if (repeat === 'shuffle') {
                setRepeat('repeatOne');
              }
            }}
            className="flex-row mx-2  justify-center mt-5">
            {repeat === 'repeatOne' ? (
              <RepeatOne color="#d7dad9" />
            ) : repeat === 'repeatAll' ? (
              <RepeatOne color="#d7dad9" repeatOne={false} />
            ) : repeat === 'shuffle' ? (
              <Shuffle color="#d7dad9" />
            ) : null}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
