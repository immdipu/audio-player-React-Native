import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
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
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import {Previous, Next, Play, Pause, Heart, RepeatOne, Shuffle} from '../icons';
import {ActivityIndicator} from 'react-native-paper';
import {useAppContext} from '../context/AppContext';
const PlayerControls = () => {
  const {isExpanded} = useAppContext();
  const [play, setPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const scalePlayPause = useSharedValue(1);
  const opacityPlayPause = useSharedValue(1);
  const scaleHeart = useSharedValue(1);
  const opacityHeart = useSharedValue(1);
  const [repeat, setRepeat] = useState<'repeatOne' | 'repeatAll' | 'shuffle'>(
    'repeatOne',
  );
  const playbackState = usePlaybackState();

  let isFullScreen = true;

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

  const togglePlayback = async (playback: any) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    if (currentTrack !== null) {
      if (playback.state === State.Paused || playback.state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View
      className={clsx(' flex-row ', isExpanded ? 'items-center my-5' : ' ')}>
      {/* heart button */}
      <View
        className={clsx(
          isExpanded
            ? 'w-20'
            : 'w-10 hidden items-center h-full justify-center    ',
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
            isExpanded ? 'mx-2 mt-5' : 'mt-0 scale-90',
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
          isExpanded ? 'flex-1  justify-center' : ' scale-75',
        )}>
        {isExpanded && (
          <Pressable
            android_ripple={{
              color: '#4d4c4a',
              borderless: true,
              foreground: false,
              radius: 30,
            }}
            onPress={async () => {
              await TrackPlayer.skipToPrevious();
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
            'flex-row rounded-full mx-4 mt-5 items-center  justify-center ',
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
          onPress={async () => {
            await TrackPlayer.skipToNext();
          }}
          className={clsx(
            'flex-row justify-center ',
            isFullScreen ? 'mt-5  p-3 ' : 'mt-0 mr-3 scale-75 ',
          )}>
          <Next color="#d7dad9" />
        </Pressable>
      </View>
      {/* Reapeat button */}
      {isExpanded && (
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
  );
};

export default PlayerControls;
