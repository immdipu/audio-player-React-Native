import React from 'react';
import {View, Text} from 'react-native';
import ImageComponent from '../component/Image';
import {ImageSelector} from '../utils/constants';
import {AlbumTypes} from '../types/album';
import * as Animatable from 'react-native-animatable';

interface AlbumSquareProps extends AlbumTypes {
  Index: number;
  isPlaylist?: boolean;
}

export const AlbumSquare: React.FC<AlbumSquareProps> = ({
  image,
  name,
  Index,
  isPlaylist = false,
  title,
}) => {
  return (
    <Animatable.View
      delay={Index * 200}
      duration={1000}
      animation="fadeInRight"
      className="flex-col mx-2 w-36 ">
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
        {isPlaylist ? title : name}
      </Text>
    </Animatable.View>
  );
};
