import React, {useState, useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {Track} from 'react-native-track-player/lib/interfaces';
import {setUpPlayer, AddTrack} from './service';
import Modal from 'react-native-modal';
import MinimizePlayer from './MinimizePlayer';

import FullScreenPlayer from './FullScreenPlayer';

const tracks: Track[] = [
  {
    url: '/storage/emulated/0/Download/comethru-Jeremy Zucker.m4a',
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

  return (
    <SafeAreaView className="flex-1 absolute w-full h-20 bg-neutral-900 bottom-0  ">
      <Modal
        isVisible={isFullScreen}
        className="w-full m-0"
        onBackButtonPress={() => setIsFullScreen(false)}>
        <FullScreenPlayer setFullScreen={setIsFullScreen} />
      </Modal>
      <MinimizePlayer setFullScreen={setIsFullScreen} />
    </SafeAreaView>
  );
};

export default Player;
