import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Track} from 'react-native-track-player';

interface initialStateProps {
  currentTrack: Track | null;
}

const initialState: initialStateProps = {
  currentTrack: null,
};

export const PlayerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AddCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const {AddCurrentTrack} = PlayerSlice.actions;
export default PlayerSlice.reducer;
