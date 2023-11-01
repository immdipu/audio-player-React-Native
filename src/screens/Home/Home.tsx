import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon} from 'react-native-heroicons/outline';
import {TouchableRipple} from 'react-native-paper';
import StaticSearch from './StaticSearch';
import {SongCardSquare} from './../../Reusable/SongCardSquare';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {BASE_URL} from '../../utils/constants';
import {AlbumSquare} from '../../Reusable/AlbumCard';

const Home = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Artist');
  };

  const {data, error, isLoading} = useQuery({
    queryKey: ['HomeData'],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/modules?language=hindi,english`,
      );
      const datas = await response.json();
      return datas.data;
    },
  });

  if (isLoading) {
    return <Text className="mt-32 text-black">Loading...</Text>;
  }

  if (error) {
    return <Text className="mt-9 text-black">Error: {error.message}</Text>;
  }

  console.log(data);

  return (
    <View className="bg-neutral-900 flex-1">
      <StatusBar backgroundColor={'rgb(23 23 23 )'} />
      <SafeAreaView>
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

        {/* Album */}

        <View className=" mt-5">
          <Text className="text-neutral-200 px-5 font-medium text-lg ">
            Albums
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingHorizontal: 13}}
            showsHorizontalScrollIndicator={false}
            className="  mt-3">
            <AlbumSquare />
          </ScrollView>
        </View>

        {/* <View>
          <Button title="Go to Artist" onPress={handlePress} />
        </View> */}
      </SafeAreaView>
    </View>
  );
};

export default Home;
