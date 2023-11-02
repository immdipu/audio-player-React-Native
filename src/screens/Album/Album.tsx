import {View, Text, FlatList} from 'react-native';
import React from 'react';
import ImageComponent from '../../component/Image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {SongApi} from '../../Apis/SongApi';
import SongSkeleton from '../../Reusable/SongSkeleton';
import SongCard from '../../Reusable/Song/SongCard';
import {ImageSelector} from '../../utils/constants';

const Album = ({route}: {route: any}) => {
  const {id}: {id: string} = route.params;

  const {data, error, isSuccess, isLoading} = useQuery({
    queryKey: ['AlbumDetails', id],
    queryFn: () => SongApi.getAlbumDetails(id),
    retry: 1,
  });

  if (data) {
    console.log(data.songs.length);
  }

  if (error) {
    console.log(error);
  }

  if (isSuccess) {
    console.log('success');
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 pt-0 top-0 bg-neutral-800">
        <View className="">
          <ImageComponent
            url={data?.image ? ImageSelector(data?.image) : null}
            defaultImage={null}
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
        ) : (
          <View className=" mt-2 flex-1 pb-10">
            <Text className="text-neutral-200 mb-3 px-5 font-semibold text-lg ">
              Songs
            </Text>
            <FlatList
              className=""
              data={data?.songs}
              renderItem={({item, index}) => (
                <SongCard {...item} Index={index} />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Album;
