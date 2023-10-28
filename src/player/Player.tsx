import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import {Track} from 'react-native-track-player/lib/interfaces';
import {setUpPlayer, AddTrack} from './service';
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';

import SongInfo from './SongInfo';

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
    <View className="bg-neutral-900 flex-1">
      {/* <Text>
          duration: {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text> */}

      <View>
        <SongInfo />
      </View>
    </View>
  );
}
