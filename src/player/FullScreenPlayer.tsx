import React, {Dispatch, SetStateAction} from 'react';
import {View, SafeAreaView, Pressable, ScrollView} from 'react-native';
import SongInfo from './SongInfo';
import ArrowDown from '../icons/ArrowDown';
import DowMenu from '../icons/DotMenu';

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
        <View className="px-4 mt-2 flex-row justify-between">
          <Pressable
            className=" w-10 h-10  flex-row items-center justify-center rounded-full p-2"
            onPress={() => {
              setFullScreen(false);
            }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullScreenPlayer;
