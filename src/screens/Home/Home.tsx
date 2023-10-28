import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon} from 'react-native-heroicons/outline';
import {TouchableRipple} from 'react-native-paper';
import StaticSearch from './StaticSearch';
import {SongCardSquare} from './../../Reusable/SongCardSquare';

const Home = () => {
  return (
    <View className="bg-neutral-900 flex-1">
      <StatusBar backgroundColor={'rgb(23 23 23 )'} />
      <SafeAreaView>
        <StatusBar barStyle={'default'} />
        <View className="flex flex-row items-center  justify-between  px-3 mt-3">
          <TouchableRipple
            onPress={() => console.warn('Pressed')}
            className="w-12 h-12   rounded-full items-center justify-center "
            rippleColor="#323232">
            <Bars3CenterLeftIcon color={'white'} size={30} />
          </TouchableRipple>
          <Text className="text-neutral-200 font-semibold text-3xl pr-8">
            BeatStreet
          </Text>
        </View>
        <View className=" border-white mt-5">
          <Text className="text-neutral-300 text-2xl pl-5 font-medium">
            Welcome,
          </Text>
        </View>
        <StaticSearch />
        <View className=" mt-8">
          <Text className="text-neutral-200 px-5 font-medium text-lg ">
            Recent Played Song
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingHorizontal: 13}}
            showsHorizontalScrollIndicator={false}
            className="  mt-3">
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
            <SongCardSquare />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
