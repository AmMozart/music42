import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from './userAPI';

import { RootState } from '../../app/store';

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  return await fetchUserData();
});

interface UserState {
  username: string;
  email: string;
  admin: number;
}

const initialState: UserState = {
  username: '',
  email: '',
  admin: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.username = action.payload.data?.username;
      state.email = action.payload.data?.email;
      state.admin = action.payload.data?.admin;
    });
  },
});

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
