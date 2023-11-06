/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import he from 'he';
import React from 'react';
import {IRecentSong} from '../../types/storageTypes';
import ImageComponent from '../Image';

interface IRecentSongProps extends IRecentSong {
  handlePlay: () => void;
}

const RecentSongCard: React.FC<IRecentSongProps> = ({
  artwork,
  title,
  handlePlay,
}) => {
  let decodedTitle = he.decode(title);

  return (
    <View className="flex-col mx-2 w-36 ">
      <ImageComponent
        url={artwork ? artwork : null}
        heightMultiplier={0.7}
        widthMultiplier={2}
      />
      <Text
        style={{lineHeight: 17}}
        className="text-neutral-300 mt-2  leading-tight px-px text-center text-xs font-normal">
        {decodedTitle.length > 30
          ? decodedTitle.substring(0, 30) + '...'
          : decodedTitle}
      </Text>
    </View>
  );
};

export default RecentSongCard;
