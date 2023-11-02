import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

export async function setUpPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function AddTrack(playList) {
  await TrackPlayer.add(playList);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function PlayerService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, data => {
    console.log('PlaybackActiveTrackChanged', data);
    return data;
  });
}
