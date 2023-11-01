import React from 'react';
import {View, Text} from 'react-native';
import ImageComponent from '../component/Image';
import {ImageSelector} from '../utils/constants';
import {AlbumTypes} from '../types/album';

export const AlbumSquare: React.FC<AlbumTypes> = ({
  artists,
  image,
  name,
  id,
  language,
}) => {
  return (
    <View className="flex-col mx-2 w-36 ">
      <ImageComponent
        url={image ? ImageSelector(image) : null}
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
