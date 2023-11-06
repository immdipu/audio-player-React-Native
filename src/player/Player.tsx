/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {setUpPlayer, AddTrack} from './service';
import NewPlayer from './NewPlayer';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {AddCurrentTrack} from '../redux/slice/playerSlice';
import TrackPlayer, {Event, Track} from 'react-native-track-player';
import {ReadyPlayer} from '../redux/slice/playerSlice';
import {addSongToRecent} from '../redux/slice/playerSlice';
import {IRecentSong} from '../types/storageTypes';
import {getObject} from '../utils/Storage';
import {FetchAllRecentSong} from '../redux/slice/playerSlice';

const Player = () => {
  const dispatch = useAppDispatch();
  const {isPlayerReady} = useAppSelector(state => state.player);

  async function SetuP() {
    let isSetup = await setUpPlayer();
    console.log('isSetup', isSetup);
    if (isSetup) {
      const recentSong: IRecentSong[] = await getObject('RecentSong');
      if (recentSong && recentSong.length > 0) {
        dispatch(FetchAllRecentSong(recentSong));
        await TrackPlayer.reset();
        await TrackPlayer.add(recentSong as any);
        await TrackPlayer.skip(0);
        dispatch(AddCurrentTrack(recentSong[0] as Track));
      }
    }
    dispatch(ReadyPlayer(isSetup));
  }

  useEffect(() => {
    SetuP();
  }, []);

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, data => {
      if (data.track) {
        dispatch(AddCurrentTrack(data.track));
        let song: IRecentSong = {
          id: data.track.id,
          title: data.track.title!,
          artist: data.track.artist,
          artwork: data.track.artwork,
          duration: data.track.duration?.toString(),
          url: data.track.url,
        };
        dispatch(addSongToRecent(song));
      }
    });
  }, []);

  if (!isPlayerReady) {
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>;
  }

  return <NewPlayer />;
};

export default Player;
