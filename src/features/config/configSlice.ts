import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchConfig } from './configAPI';

import { RootState } from '../../app/store';
import { FetchState } from '../../app/types';

export const getConfig = createAsyncThunk('config/getConfig', async () => {
  const result = await fetchConfig();
  return result;
});

interface Config {
  fetchState: FetchState;
  fromDB: any;
}

const initialState: Config = {
  fetchState: 'idle',
  fromDB: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfig.pending, (state) => {
      state.fetchState = 'loading';
    });
    builder.addCase(getConfig.fulfilled, (state, action) => {
      state.fetchState = 'success';
      state.fromDB = action.payload;
    });
    builder.addCase(getConfig.rejected, (state) => {
      state.fetchState = 'error';
    });
  },
});

export const configFromDB = (state: RootState) => state.config.fromDB;

export default configSlice.reducer;
