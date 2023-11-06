/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import he from 'he';
import React from 'react';
import {IRecentSong} from '../../types/storageTypes';
import ImageComponent from '../Image';

interface IRecentSongProps extends IRecentSong {
  handlePlay: (id: string) => void;
}

const RecentSongCard: React.FC<IRecentSongProps> = ({
  artwork,
  title,
  handlePlay,
  id,
}) => {
  let decodedTitle = he.decode(title);

  const handlePress = () => {
    handlePlay(id);
  };

  return (
    <View className="flex-col mx-2 w-36 ">
      <ImageComponent
        url={artwork ? artwork : null}
        heightMultiplier={0.16}
        widthMultiplier={0.36}
        onPress={handlePress}
      />
      <Text
        style={{lineHeight: 17}}
        className="text-neutral-100 mt-2  leading-tight px-px text-center font-medium ">
        {decodedTitle.length > 30
          ? decodedTitle.substring(0, 30) + '...'
          : decodedTitle}
      </Text>
    </View>
  );
};

export default RecentSongCard;
