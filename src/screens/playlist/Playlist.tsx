/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import ImageComponent from '../../component/Image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {SongApi} from '../../Apis/SongApi';
import SongSkeleton from '../../Reusable/SongSkeleton';
import SongCard from '../../Reusable/Song/SongCard';
import {ImageSelector} from '../../utils/constants';
import BackButton from '../../Reusable/BackButton';
import {useNavigation} from '@react-navigation/native';
import {ConvertAudioMetaData} from '../../utils/constants';
import TrackPlayer, {Track} from 'react-native-track-player';

const Playlist = ({route}: {route: any}) => {
  const {id}: {id: string} = route.params;
  const navigation = useNavigation();
  const [convertedAudios, setConvertedAudios] = React.useState<Track[]>([]);

  const {data, error, isSuccess, isLoading, isError} = useQuery({
    queryKey: ['AlbumDetails', id],
    queryFn: () => SongApi.getPlaylistDetails(id),
    retry: 1,
  });

  useEffect(() => {
    if (data?.songs) {
      const songs = ConvertAudioMetaData(data?.songs);
      setConvertedAudios(songs);
    }
  }, [data?.songs]);

  if (error) {
    console.log(error);
  }

  const addSongsToQueue = async (SongId: string) => {
    const IndexOfSong = convertedAudios.findIndex(song => song.id === SongId);
    await TrackPlayer.reset();
    await TrackPlayer.add(convertedAudios);
    await TrackPlayer.skip(IndexOfSong);
    await TrackPlayer.play();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute z-10 mt-3 mx-2">
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View className="flex-1 pt-0 top-0 bg-neutral-800">
        <View className="">
          <ImageComponent
            url={data?.image ? ImageSelector(data?.image) : null}
            widthMultiplier={1}
            heightMultiplier={0.32}
            borderRadius={0}
          />
        </View>
        {isLoading ? (
          <View>
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
          </View>
        ) : isError ? (
          <View>
            <Text>Something went wrong</Text>
          </View>
        ) : data?.songs.length === 0 ? (
          <View>
            <Text>No Songs</Text>
          </View>
        ) : data?.songs && data.songs.length > 0 && isSuccess ? (
          <View className=" mt-2 flex-1 pb-10">
            <Text className="text-neutral-200 mb-3 px-5 font-semibold text-lg ">
              Songs -{' '}
              <Text className="text-base text-neutral-200">
                {data?.songs.length}
              </Text>
            </Text>
            <FlatList
              className=""
              data={data?.songs}
              renderItem={({item, index}) => (
                <SongCard
                  {...item}
                  Index={index}
                  handlePlay={addSongsToQueue}
                />
              )}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Playlist;
