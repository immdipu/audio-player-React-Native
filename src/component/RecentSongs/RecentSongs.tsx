import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, memo} from 'react';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {getObject} from '../../utils/Storage';
import {FetchAllRecentSong} from '../../redux/slice/playerSlice';
import {IRecentSong} from '../../types/storageTypes';

const RecentSongs = memo(() => {
  const {recentSong} = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getObject('RecentSong').then(data => {
      if (data) {
        dispatch(FetchAllRecentSong(data));
      }
    });
  }, []);

  const handleSongPlay = async () => {};

  return (
    <View>
      <Text>RecentSongs</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{paddingHorizontal: 13}}
        showsHorizontalScrollIndicator={false}
        className="  mt-3">
        {recentSong?.map((item, index) => (
          <RecentSongCard {...item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
});

export default RecentSongs;
