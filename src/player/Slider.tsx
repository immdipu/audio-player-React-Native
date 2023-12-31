import {Text, View} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@miblanchard/react-native-slider';
import {useAppContext} from '../context/AppContext';
import clsx from 'clsx';
import {useAppSelector} from '../redux/hooks';
import {AudioDurationConverter} from '../utils/constants';

const SiderComponent = React.memo(() => {
  const {position, buffered} = useProgress();
  const [sliderValue, setSliderValue] = useState(position);
  const {isExpanded} = useAppContext();
  const currentPlayer = useAppSelector(state => state?.player?.currentTrack);

  // useEffect(() => {
  //   setSliderValue(Math.floor(position));
  // }, [position]);

  const handleSliderRelease = useCallback(async (value: number) => {
    await TrackPlayer.seekTo(value);
  }, []);

  return (
    <View className={clsx('mt-5 mx-10', isExpanded ? 'mx-10' : 'mx-0 mt-0')}>
      {!isExpanded && (
        <View className="absolute -top-[10px] left-0 right-0 z-10">
          <Slider
            value={Math.floor(position)}
            maximumValue={currentPlayer?.duration || 100}
            minimumValue={0}
            thumbTintColor="white"
            maximumTrackTintColor="grey"
            minimumTrackTintColor="#d9d5d4"
            thumbTouchSize={{height: 10, width: 10}}
            trackStyle={{height: 1}}
            containerStyle={{height: 2}}
            thumbStyle={{height: 5, width: 5}}
            onSlidingStart={value => {
              setSliderValue(value[0]);
            }}
            onSlidingComplete={values => {
              handleSliderRelease(values[0]);
              setSliderValue(values[0]);
            }}
          />
        </View>
      )}
      {isExpanded && (
        <View className="flex-row justify-between px-1">
          <Text className="text-neutral-300 font-medium font-serif text-base">
            {new Date(position * 1000).toISOString().substring(15, 19)}
          </Text>
          <Text className="text-neutral-300 font-medium font-serif text-base">
            {currentPlayer?.duration
              ? AudioDurationConverter(currentPlayer?.duration)
              : '00:00'}
          </Text>
        </View>
      )}

      {isExpanded && (
        <Slider
          value={Math.floor(position)}
          maximumValue={currentPlayer?.duration || 100}
          minimumValue={0}
          thumbTintColor="white"
          maximumTrackTintColor={'transparent'}
          minimumTrackTintColor="white"
          thumbTouchSize={{height: 45, width: 45}}
          trackStyle={{height: 5}}
          containerStyle={{height: 20}}
          onSlidingStart={value => {
            setSliderValue(value[0]);
          }}
          onSlidingComplete={values => {
            handleSliderRelease(values[0]);
            setSliderValue(values[0]);
          }}
        />
      )}
      {isExpanded && (
        <View className="absolute -z-10 w-full top-6">
          <Slider
            value={buffered}
            maximumValue={100}
            minimumValue={0}
            maximumTrackTintColor="#424242"
            minimumTrackTintColor="#737373"
            thumbTouchSize={{height: 0, width: 0}}
            thumbStyle={{height: 0, width: 0}}
            trackStyle={{height: 5}}
            containerStyle={{height: 20}}
            disabled={true}
          />
        </View>
      )}
    </View>
  );
});

export default SiderComponent;
