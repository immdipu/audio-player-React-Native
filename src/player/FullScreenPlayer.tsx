import React, {Dispatch, SetStateAction} from 'react';
import {View, SafeAreaView, Pressable, ScrollView} from 'react-native';
import SongInfo from './SongInfo';

interface miniminzedProps {
  setFullScreen: Dispatch<SetStateAction<boolean>>;
}

const FullScreenPlayer: React.FC<miniminzedProps> = ({setFullScreen}) => {
  return (
    <SafeAreaView className="bg-neutral-900  overflow-hidden flex-1">
      <ScrollView>
        {/* <Text>
        duration: {new Date(position * 1000).toISOString().substring(15, 19)}
      </Text> */}

        <View className="mt-5">
          <SongInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullScreenPlayer;
