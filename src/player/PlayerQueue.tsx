/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useAppContext} from '../context/AppContext';
import TrackPlayer from 'react-native-track-player';
import QueueSongCard from '../Reusable/Song/QueueSongCard';
import {songQueueTypes} from '../types/song';
import {useAppSelector} from '../redux/hooks';

const App = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {isExpanded} = useAppContext();
  const [data, setData] = React.useState<songQueueTypes[] | null>(null);
  const player = useAppSelector(state => state?.player);

  useLayoutEffect(() => {
    if (bottomSheetModalRef.current) {
      if (isExpanded) {
        bottomSheetModalRef.current?.present();
      } else {
        bottomSheetModalRef.current?.dismiss();
      }
    }
  }, [isExpanded]);

  // variables
  const snapPoints = useMemo(() => ['20%', '65%'], []);

  const getQueue = useCallback(async () => {
    const queue: unknown = await TrackPlayer.getQueue();
    setData(queue as songQueueTypes[]);
  }, []);

  useEffect(() => {
    if (player.isPlayerReady) {
      getQueue();
    }
  }, [player?.currentTrack, player.isPlayerReady]);

  const PlaySong = useCallback(async (songIndex: number) => {
    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container} className="mt-10 sticky bottom-0 ">
        <BottomSheetModal
          enablePanDownToClose={false}
          ref={bottomSheetModalRef}
          index={0}
          backgroundStyle={{backgroundColor: 'rgba(52, 52, 52, 0.92)'}}
          handleIndicatorStyle={{backgroundColor: '#fff'}}
          snapPoints={snapPoints}>
          {/* <View style={styles.contentContainer}>
            <FlatList
              className=""
              data={data}
              renderItem={({item, index}) => (
                <QueueSongCard {...item} index={index} handlePlay={PlaySong} />
              )}
            />
          </View> */}
          <BottomSheetFlatList
            data={data}
            renderItem={({item, index}) => (
              <QueueSongCard {...item} index={index} handlePlay={PlaySong} />
            )}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default App;
