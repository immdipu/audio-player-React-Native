import React from 'react';
import {Text, View} from 'react-native';
import ImageComponent from '../component/Image';
import {ImageSelector} from '../utils/constants';
import {AlbumTypes} from '../types/album';
import {useNavigation} from '@react-navigation/native';

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
  id,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    console.log('album button pressed');
    if (!isPlaylist) {
      navigation.navigate('Album', {id: id});
    }
  };

  return (
    <View className="flex-col mx-2 w-36 ">
      <ImageComponent
        url={image ? ImageSelector(image) : null}
        heightMultiplier={0.15}
        widthMultiplier={0.35}
        borderRadius={7}
        onPress={handleNavigation}
      />
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{lineHeight: 17}}
        className="text-neutral-300 mt-2 leading-tight px-px text-center text-sm">
        {isPlaylist ? title : name}
      </Text>
    </View>
  );
};
