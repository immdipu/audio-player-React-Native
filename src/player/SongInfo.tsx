/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import Imagee from '../component/Image';
import {Previous, Next, Play, Pause, Heart, RepeatOne, Shuffle} from '../icons';
import {Pressable} from 'react-native';
import clsx from 'clsx';
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';

export default function SongInfo({
  isFullScreen = true,
}: {
  isFullScreen?: boolean;
}) {
  const [play, setPlay] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const scalePlayPause = useSharedValue(1);
  const opacityPlayPause = useSharedValue(1);
  const scaleHeart = useSharedValue(1);

  const opacityHeart = useSharedValue(1);
  const [repeat, setRepeat] = React.useState<
    'repeatOne' | 'repeatAll' | 'shuffle'
  >('repeatOne');
  const playbackState = usePlaybackState();
  const {position, buffered} = useProgress();
  const [sliderValue, setSliderValue] = useState(position);

  return (
    <View
      className={clsx(isFullScreen ? 'flex-col' : 'flex-row w-full mt-2 px-3')}>
      {!isFullScreen && (
       
      )}
      <View
        className={clsx(
          ' flex-row justify-center ',
          isFullScreen ? 'justify-center' : 'justify-start pl-3',
        )}>
        <Imagee
          heightMultiplier={0.35}
          widthMultiplier={0.86}
          url="https://c.saavncdn.com/599/Panandalian-Good-For-A-Time-Tagalog-2022-20220715144646-500x500.jpg"
          borderRadius={isFullScreen ? 12 : 8}
          isFullScreen={isFullScreen}
        />
      </View>

      <View
        className={clsx(
          ' flex-row',
          isFullScreen ? 'items-center my-5' : 'mt-0 items-start',
        )}>
        {/* heart button */}
        <View
          className={clsx(
            isFullScreen
              ? 'w-20'
              : 'w-10 items-center h-full justify-center    ',
          )}>
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
            className={clsx(
              'flex-row mx-2 items justify-center',
              isFullScreen ? 'mx-2 mt-5' : 'mt-0 scale-90',
            )}>
            <Animated.View style={HeartStyle}>
              {isLiked ? (
                <Heart color="#f53030" strokeColor="#f53030" />
              ) : (
                <Heart color="transparent" strokeColor="#a7a9a9" />
              )}
            </Animated.View>
          </Pressable>
        </View>
        {/* play pause next previous control */}
        <View
          className={clsx(
            'flex-row  items-center    ',
            isFullScreen ? 'flex-1  justify-center' : 'flex ',
          )}>
          {isFullScreen && (
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
              className="flex-row    rounded-full  p-3 items-center justify-center mt-5">
              <Previous color="#d7dad9" />
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              togglePlayback(playbackState);
              togglePlayPauseAnimation();
            }}
            className={clsx(
              'flex-row rounded-full  items-center  justify-center ',
              isFullScreen ? 'mx-4 mt-5 ' : 'mx-0  mr-2 scale-75',
            )}>
            <ActivityIndicator
              color="white"
              animating={playbackState.state === 'buffering'}
              size={68}
              className="absolute  bottom-0 right-0 left-0 top-0"
            />
            <Animated.View style={PlayPauseStyle}>
              {playbackState.state === 'playing' ? <Play /> : <Pause />}
            </Animated.View>
          </Pressable>
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={() => {}}
            className={clsx(
              'flex-row justify-center ',
              isFullScreen ? 'mt-5  p-3 ' : 'mt-0 mr-3 scale-75 ',
            )}>
            <Next color="#d7dad9" />
          </Pressable>
        </View>
        {/* Reapeat button */}
        {isFullScreen && (
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
        )}
      </View>
    </View>
  );
}
