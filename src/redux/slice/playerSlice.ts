import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Track} from 'react-native-track-player';
import {IRecentSong} from '../../types/storageTypes';
import {RecentSongAdd} from '../../utils/Storage';

interface initialStateProps {
  currentTrack: Track | null;
  isPlayerReady: boolean;
  recentSong: IRecentSong[];
}

const initialState: initialStateProps = {
  currentTrack: null,
  isPlayerReady: false,
  recentSong: [],
};

export const PlayerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AddCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    ReadyPlayer: (state, action: PayloadAction<boolean>) => {
      state.isPlayerReady = action.payload;
    },
    AddRecentSong: (state, action: PayloadAction<IRecentSong>) => {
      state.recentSong.unshift(action.payload);
      RecentSongAdd(action.payload);
    },
    FetchAllRecentSong: (state, action: PayloadAction<IRecentSong[]>) => {
      state.recentSong = action.payload;
    },
  },
});

export const {AddCurrentTrack, ReadyPlayer, AddRecentSong, FetchAllRecentSong} =
  PlayerSlice.actions;
export default PlayerSlice.reducer;
