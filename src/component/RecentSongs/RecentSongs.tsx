/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {useAppSelector} from '../../redux/hooks';
import {IRecentSong} from '../../types/storageTypes';
import RecentSongCard from './RecentSongCard';
import TrackPlayer from 'react-native-track-player';

const RecentSongs = memo(() => {
  const {recentSong} = useAppSelector(state => state.player);

  const handleSongPlay = async (id: string) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(recentSong as any);
    let index = recentSong?.findIndex((item: IRecentSong) => item.id === id);
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  };

  return (
    <View>
      <Text className="px-6 text-lg font-medium text-neutral-100">
        Recently played song
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{paddingHorizontal: 13}}
        showsHorizontalScrollIndicator={false}
        className="  mt-3">
        {recentSong?.map((item, index) => (
          <RecentSongCard {...item} handlePlay={handleSongPlay} key={index} />
        ))}
      </ScrollView>
    </View>
  );
});

export default RecentSongs;
