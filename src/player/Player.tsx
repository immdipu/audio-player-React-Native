import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator, Pressable} from 'react-native';
import {Track} from 'react-native-track-player/lib/interfaces';
import {setUpPlayer, AddTrack} from './service';
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';

import SongInfo from './SongInfo';
import {ChevronDownIcon} from 'react-native-heroicons/solid';
import {IconButton} from 'react-native-paper';
import ArrowDown from '../icons/ArrowDown';
import DowMenu from '../icons/DotMenu';

const tracks: Track[] = [
  {
    url: '/storage/emulated/0/Download/comethru-Jeremy Zucker.m4a', // Load media from the network
  },
];

export default function Player() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playbackState = usePlaybackState();
  const {duration, position} = useProgress();

  async function SetuP() {
    let isSetup = await setUpPlayer();
    console.log('isSetup', isSetup);
    if (isSetup) {
      await AddTrack(tracks);
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    SetuP();
  }, []);

  const togglePlayback = async (playback: any) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    console.log(playback);
    if (currentTrack !== null) {
      if (playback.state === State.Paused || playback.state === State.Ready) {
        console.log('play button clicked');
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  if (!isPlayerReady) {
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>;
  }

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      {/* <Text>
          duration: {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text> */}

      <View className="px-4 mt-2 flex-row justify-between">
        <Pressable
          className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
          android_ripple={{
            color: '#4d4c4a',
            borderless: false,
            foreground: false,
            radius: 20,
          }}>
          <ArrowDown />
        </Pressable>
        <Pressable
          className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
          android_ripple={{
            color: '#4d4c4a',
            borderless: false,
            foreground: false,
            radius: 20,
          }}>
          <DowMenu />
        </Pressable>
      </View>

      <View className="mt-5">
        <SongInfo />
      </View>
    </SafeAreaView>
  );
}
