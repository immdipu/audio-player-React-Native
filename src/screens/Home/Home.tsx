import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon} from 'react-native-heroicons/outline';
import {TouchableRipple} from 'react-native-paper';
import StaticSearch from './StaticSearch';
import {SongCardSquare} from './../../Reusable/SongCardSquare';
import {useQuery} from '@tanstack/react-query';
import {AlbumSquare} from '../../Reusable/AlbumCard';
import {SongApi} from '../../Apis/SongApi';
import {getObject, storeObject} from '../../utils/Storage';
import {HomedataProps} from '../../Apis/SongApi';
import {useToast} from 'react-native-toast-notifications';
const Home = () => {
  const [Homedata, setHomedata] = useState<HomedataProps | null>(null);
  const toast = useToast();

  useEffect(() => {
    getObject('HomeData').then(data => {
      if (data) {
        setHomedata(data);
      }
    });
  }, []);

  const {data, error, isSuccess} = useQuery({
    queryKey: ['HomeData'],
    queryFn: () => SongApi.GetHomeData(),
    retry: 1,
  });

  if (error) {
    toast.show('Error occured while fetching data', {
      type: 'danger',
    });
  }

  if (isSuccess) {
    storeObject('HomeData', data);
  }
  return (
    <View className="bg-neutral-900 flex-1">
      <StatusBar backgroundColor={'rgb(23 23 23 )'} />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} className="mb-20 ">
          <StatusBar barStyle={'default'} />
          <View className="flex flex-row items-center  justify-between  px-3 mt-3">
            <TouchableRipple
              onPress={() => console.warn('Pressed')}
              className="w-12 h-12   rounded-full items-center justify-center "
              rippleColor="#323232">
              <Bars3CenterLeftIcon color={'white'} size={30} />
            </TouchableRipple>
            <Text className="text-neutral-200 font-semibold text-3xl pr-8">
              BeatStreet
            </Text>
          </View>
          <View className=" border-white mt-5">
            <Text className="text-neutral-300 text-2xl pl-5 font-medium">
              Welcome,
            </Text>
          </View>
          <StaticSearch />
          <View className=" mt-8">
            <Text className="text-neutral-200 px-5 font-medium text-lg ">
              Recent Played Song
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{paddingHorizontal: 13}}
              showsHorizontalScrollIndicator={false}
              className="  mt-3">
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
              <SongCardSquare />
            </ScrollView>
          </View>

          {/* Trending albums */}
          {Homedata && (
            <View>
              <View className=" mt-4 ">
                <Text className="text-neutral-200 mb-3 px-5 font-semibold text-lg ">
                  Trending Albums
                </Text>
                <FlatList
                  data={Homedata?.trending?.albums}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <AlbumSquare {...item} Index={index} />
                  )}
                />
              </View>
              {/* Album */}

              <View className=" mt-2">
                <Text className="text-neutral-200 mb-3 px-5 font-semibold text-lg ">
                  Albums
                </Text>
                <FlatList
                  data={Homedata?.albums}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <AlbumSquare {...item} Index={index} />
                  )}
                />
              </View>
              {/* Playlist */}
              <View className=" mt-2 pb-8">
                <Text className="text-neutral-200 mb-3 px-5 font-semibold text-lg ">
                  Playlist
                </Text>
                <FlatList
                  data={Homedata?.playlists as any}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <AlbumSquare {...item} isPlaylist={true} Index={index} />
                  )}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
