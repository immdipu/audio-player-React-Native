import React from 'react';
import {Text, View} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';

const StaticSearch = () => {
  return (
    <View className="bg-neutral-700 mt-3 mx-5 items-center flex-row h-12 pl-3 gap rounded-md">
      <MagnifyingGlassIcon color={'rgb(163 163 163)'} size={25} />
      <Text className="text-neutral-400 text-lg ml-3">
        Search songs, albums, artist
      </Text>
    </View>
  );
};

export default StaticSearch;
