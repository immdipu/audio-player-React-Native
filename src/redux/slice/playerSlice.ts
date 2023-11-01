import {createSlice} from '@reduxjs/toolkit';

interface initialStateProps {
  fullName: string | null;
  username: string | null;
  isUserAuthenticated: boolean;
  token: string | null;
  id: string | null;
  profilePic: string | null;
}

const initialState: initialStateProps = {
  fullName: null,
  username: null,
  isUserAuthenticated: false,
  token: null,
  id: null,
  profilePic: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LoggedOut: state => {
      state.fullName = null;
      state.id = null;
      state.profilePic = null;
      state.username = null;
      state.isUserAuthenticated = false;
    },
  },
});

export const {LoggedOut} = authSlice.actions;
export default authSlice.reducer;
