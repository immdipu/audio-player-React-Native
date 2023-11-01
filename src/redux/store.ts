import {configureStore} from '@reduxjs/toolkit';
import playerSlice from './slice/playerSlice';

export const store = configureStore({
  reducer: {
    player: playerSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
