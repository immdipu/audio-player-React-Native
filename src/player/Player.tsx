/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {Track} from 'react-native-track-player/lib/interfaces';
import {setUpPlayer, AddTrack} from './service';
import Modal from 'react-native-modal';
import MinimizePlayer from './MinimizePlayer';
import NewPlayer from './NewPlayer';

import FullScreenPlayer from './FullScreenPlayer';

const tracks: Track[] = [
  {
    url: 'https://aac.saavncdn.com/599/4136b35d9ed254611fe227cb1cb0c41d_320.mp4',
  },
];

const Player = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  if (!isPlayerReady) {
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>;
  }

  return <NewPlayer />;
};

export default Player;
