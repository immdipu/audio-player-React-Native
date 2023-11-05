import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Track} from 'react-native-track-player';

interface initialStateProps {
  currentTrack: Track | null;
  isPlayerReady: boolean;
}

const initialState: initialStateProps = {
  currentTrack: null,
  isPlayerReady: false,
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
  },
});

export const {AddCurrentTrack, ReadyPlayer} = PlayerSlice.actions;
export default PlayerSlice.reducer;
