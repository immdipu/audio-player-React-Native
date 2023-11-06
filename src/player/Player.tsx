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

const Player = () => {
  const dispatch = useAppDispatch();
  const isPlayerReady = useAppSelector(state => state.player.isPlayerReady);

  async function SetuP() {
    let isSetup = await setUpPlayer();
    console.log('isSetup', isSetup);
    if (isSetup) {
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
