import React, {Dispatch, SetStateAction} from 'react';
import {SafeAreaView, Text, Pressable, View} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import ImageComponent from '../component/Image';
import {Previous, Next, Play, Pause} from '../icons';
import {ActivityIndicator} from 'react-native-paper';

interface miniminzedProps {
  setFullScreen: Dispatch<SetStateAction<boolean>>;
}

import SongInfo from './SongInfo';

const MinimizePlayer: React.FC<miniminzedProps> = ({setFullScreen}) => {
  const panGesture = Gesture.Pan().onEnd(e => {
    if (e.translationY < -30) {
      setFullScreen(true);
    }
  });

  return (
    <SafeAreaView className="">
      <Pressable
        onPress={() => {
          setFullScreen(true);
        }}>
        <View>
          <SongInfo isFullScreen={false} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default MinimizePlayer;