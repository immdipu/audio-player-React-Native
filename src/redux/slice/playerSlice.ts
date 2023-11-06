import {PayloadAction, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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

export const addSongToRecent = createAsyncThunk(
  'addSongToRecent',
  async (value: IRecentSong) => {
    await RecentSongAdd(value);
    return value;
  },
);

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
    },
    FetchAllRecentSong: (state, action: PayloadAction<IRecentSong[]>) => {
      state.recentSong = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addSongToRecent.fulfilled, (state, action) => {
      let alreadyExist = state.recentSong.find(
        item => item.id === action.payload.id,
      );
      if (alreadyExist) {
        let newdata = state.recentSong.filter(
          item => item.id !== action.payload.id,
        );
        newdata.unshift(action.payload);
        state.recentSong = newdata;
      } else {
        state.recentSong.unshift(action.payload);
      }
    });
  },
});

export const {AddCurrentTrack, ReadyPlayer, AddRecentSong, FetchAllRecentSong} =
  PlayerSlice.actions;
export default PlayerSlice.reducer;
