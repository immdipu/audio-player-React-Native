/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';

export const SongCardSquare = () => {
  return (
    <View className="flex-col mx-2 w-36 ">
      <Image
        className="h-36 rounded-md"
        source={{
          uri: 'https://c.saavncdn.com/editorial/charts_RomanticTop40-English_158417_20220315153203.jpg',
        }}
      />
      <Text
        style={{lineHeight: 17}}
        className="text-neutral-300 mt-2 leading-tight px-px text-center text-sm">
        Romantic Top 40 - English
      </Text>
    </View>
  );
};
