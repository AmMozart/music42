import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { expressSignup } from './expressSignUpAPI';

import { RootState } from '../../app/store';

export interface expressSignUpData {
  username: string;
  email: string;
  password?: string;
}

export const fetchExpressSignup = createAsyncThunk(
  'user/expressSignup',
  async (userData: expressSignUpData) => {
    return await expressSignup(
      userData.username,
      userData.email,
      userData.password
    );
  }
);

interface expressSignUpState {
  loading: 'loading' | 'success' | 'error' | null;
  userId: number;
}

const initialState: expressSignUpState = {
  loading: null,
  userId: 0,
};

const expressSignUpSlice = createSlice({
  name: 'expressSignUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpressSignup.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchExpressSignup.fulfilled, (state, action) => {
      state.loading = 'success';
      state.userId = action.payload.user_id;
    });
    builder.addCase(fetchExpressSignup.rejected, (state) => {
      state.loading = 'error';
    });
  },
});

export const loadingUser = (state: RootState) => state.expressSignUp.loading;
export const userId = (state: RootState) => state.expressSignUp.userId;

export default expressSignUpSlice.reducer;
