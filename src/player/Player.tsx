/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {Track} from 'react-native-track-player/lib/interfaces';
import {setUpPlayer, AddTrack} from './service';
import Modal from 'react-native-modal';
import MinimizePlayer from './MinimizePlayer';
import NewPlayer from './NewPlayer';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {AddCurrentTrack} from '../redux/slice/playerSlice';
import TrackPlayer, {Event} from 'react-native-track-player';
import {ReadyPlayer} from '../redux/slice/playerSlice';

const tracks: Track[] = [
  {
    title: 'Tiptoe',
    url: 'https://aac.saavncdn.com/210/9d7ace10a2176a518e666c770cf687e6_160.mp4',
    artwork: 'http://c.saavncdn.com/210/Night-Visions-2013-500x500.jpg',
    artist: 'Imagine Dragons',
  },
  {
    title: ' "Nothing Left To Say / Rocks (Medley)',
    url: 'https://aac.saavncdn.com/210/b7e5332da3acf83ead0650845cca6f12_160.mp4',
    artwork: 'http://c.saavncdn.com/210/Night-Visions-2013-500x500.jpg',
    artist: 'Imagine Dragons',
  },
];

const Player = () => {
  const dispatch = useAppDispatch();
  const isPlayerReady = useAppSelector(state => state.player.isPlayerReady);

  async function SetuP() {
    let isSetup = await setUpPlayer();
    console.log('isSetup', isSetup);
    if (isSetup) {
      await AddTrack(tracks);

      TrackPlayer.getActiveTrack().then(track => {
        if (track) {
          dispatch(AddCurrentTrack(track));
        }
      });
    }
    dispatch(ReadyPlayer(isSetup));
  }

  useEffect(() => {
    SetuP();
  }, []);

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, data => {
      console.log('playback-track-changed', data);
      if (data.track) {
        dispatch(AddCurrentTrack(data.track));
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
