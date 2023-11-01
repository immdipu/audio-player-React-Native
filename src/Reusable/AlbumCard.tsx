import React from 'react';
import {View, Text} from 'react-native';
import ImageComponent from '../component/Image';

export const AlbumSquare = () => {
  return (
    <View className="flex-col mx-2 w-36 ">
      <ImageComponent
        url="https://c.saavncdn.com/editorial/charts_RomanticTop40-English_158417_20220315153203.jpg"
        heightMultiplier={0.15}
        widthMultiplier={0.35}
        borderRadius={7}
      />
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{lineHeight: 17}}
        className="text-neutral-300 mt-2 leading-tight px-px text-center text-sm">
        Romantic Top 40 - English
      </Text>
    </View>
  );
};
