import {View, Text, Image} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import Imagee from '../component/Image';

export default function SongInfo() {
  return (
    <View>
      <Text>SongInfo</Text>
      <View className=" flex-row justify-center ">
        <Imagee
          heightMultiplier={0.8}
          widthMultiplier={0.83}
          url="https://c.saavncdn.com/599/Panandalian-Good-For-A-Time-Tagalog-2022-20220715144646-500x500.jpg"
        />
      </View>
      <View className="mt-8 mx-10">
        <View className="flex-row justify-between px-2">
          <Text className="text-neutral-300 font-medium text-base">00:00</Text>
          <Text className="text-neutral-300 font-medium text-base">00:00</Text>
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
    </View>
  );
}
